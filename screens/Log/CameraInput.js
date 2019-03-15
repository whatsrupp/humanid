import React, {Component} from 'react'
import Camera from './Camera'
import { Button, Icon, Text, Thumbnail } from 'native-base';
import { BlurView } from 'expo';
import { Image, StyleSheet, View, Modal, ScrollView, TouchableOpacity } from 'react-native';

const thumbnailSize = 50
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
            let photo = await this.camera.camera.takePictureAsync();
            this.addPhotoToForm(photo.uri)
            this.closeCamera()
          }
    }

    addPhotoToForm = (url) => {
        const fieldArrayName = this.props.name
        const entries = this.props.form.values[fieldArrayName]
        this.props.push(url)
    }
    
    renderCameraButton = () => {
        const cancelButton = (
        <Button full danger onPress={this.closeCamera}>
            <Icon active type='FontAwesome' name='camera' />
            <Text>Cancel</Text>
        </Button>
        )
        const openButton = (
        <Button full onPress={this.openCamera}>
            <Icon active type='FontAwesome' name='camera' />
            <Text>Take Photos</Text>
        </Button>
        )
        return this.state.isOpen ? cancelButton : openButton 

    }

    renderThumbnails = ()=>{
        const fieldArrayName = this.props.name
        const entries = this.props.form.values[fieldArrayName]
        if (!entries) return null

        return entries.map((entry, index)=>{
            const fieldName = `${fieldArrayName}.${index}`
             return(
                 <Thumbnail key={fieldName} source={{uri: entries[index]}} style={{margin: 10, height: thumbnailSize, width: thumbnailSize, borderRadius: thumbnailSize/2}}/>
             )
        })
       


    }
    
    render = () => {
        return (<>
            {this.renderCamera()}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
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
                onPress={this.openCamera}
            >
                <Icon style={{fontSize: 10}}active type='FontAwesome' name='plus' />
            </TouchableOpacity>
            </ScrollView>
            {this.renderCameraButton()}

        </>)
    
    }
}