import React, {Component} from 'react'
import Camera from './Camera'
import { Button, Icon, Text } from 'native-base';
import { BlurView } from 'expo';
import { Image, StyleSheet, View, Modal } from 'react-native';

export default class CameraInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: true,
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
    
    render = () => {
        return (<>

            {this.renderCameraButton()}
            {this.renderCamera()}
        </>)
    
    }
}