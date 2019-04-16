import React, {Component} from 'react'
import { Button, Icon, Text, Thumbnail } from 'native-base';
import {ImagePicker, Permissions } from 'expo';
import {Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';
import Camera from './Camera'

const thumbnailSize = 100
export default class CameraInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            modalVisible: false,
            isSavingPhoto: false
        }
    }

      setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
      }

    renderCamera = ()=>{

        if (!this.state.isOpen) return null
                    return(
            <Modal>
                <Camera ref={ref => {this.camera = ref}}/>
                <Button full primary onPress={this.takePhoto}>
                    <Icon active type='FontAwesome' name='camera' />
                </Button> 
                <Button full danger onPress={this.closeCamera}>
                    <Text>Cancel</Text>
                </Button>
            </Modal>
            )

    }

    closeCamera = () => {
        this.setState({isOpen: false});

    }

    openCamera = () => {
        this.setState({isOpen: true});
    }

    takePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.camera.takePictureAsync();
            this.addPhotoToForm(photo.uri)
            this.closeCamera()
          }
    }

    addPhotoToForm = (url) => {
        const fieldArrayName = this.props.name
        const entries = this.props.form.values[fieldArrayName]
        this.props.push(url)
    }
    
    onThumbnailPress = (index)=>{
        Alert.alert('Delete Photo?', '', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {text: 'OK', onPress: () => this.props.remove(index)},

        ])
    }

    renderThumbnails = ()=>{
        const fieldArrayName = this.props.name
        const entries = this.props.form.values[fieldArrayName]
        if (!entries) return null

    
        return entries.map((entry, index)=>{
            const fieldName = `${fieldArrayName}.${index}`
             return(
                 <TouchableOpacity key={fieldName} onPress={()=>this.onThumbnailPress(index)}>
                     <Thumbnail  source={{uri: entries[index]}} style={{margin: 10, height: thumbnailSize, width: thumbnailSize, borderRadius: thumbnailSize/2}}/>
                 </TouchableOpacity>
             )
        })

    }
    
    useImagePicker = async () => {
        const result = await ImagePicker.launchCameraAsync()
        if(!result.cancelled){
            this.addPhotoToForm(result.uri)
        }
    }

    async componentDidMount() {
        const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: libraryStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({ hasCameraPermission: cameraStatus === 'granted', hasCameraRollPermission: libraryStatus ==='granted'});
        
      }
    
    render = () => {
        return (<>
            {this.renderCamera()}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            >
            {this.renderThumbnails()}
            <TouchableOpacity 
                style={{ borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:thumbnailSize,
                    height:thumbnailSize,
                    backgroundColor:'#fff',
                    borderRadius:thumbnailSize,
                    margin: 10,
                }}
                onPress={this.useImagePicker}
            >
                <Icon style={{fontSize: 10}}active type='FontAwesome' name='plus' />
            </TouchableOpacity>
            </ScrollView>

        </>)
    
    }
}