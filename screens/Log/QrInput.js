import React, {Component} from 'react'
import { Button, Icon, Text } from 'native-base';

import QrScanner from './QrScanner'

export default class QrInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleQRSubmit = (value) => {
        this.closeQRScanner()
        this.submitQRValueToForm(value)
    }

    submitQRValueToForm = (qrValue) => {
        return this.props.setFieldValue('qrCode', qrValue)
    }

    formQRValue = () => {
        return this.props.values.qrCode
    }

    closeQRScanner = () => {
        this.setState({isOpen: false});

    }

    openQRScanner = () => {
        this.setState({isOpen: true});
    }

    handleOnPress = ()=>{
        this.openQRScanner()
    }

    handleCancelPress = ()=>{
        this.closeQRScanner()
    }

    getButtonText = () => {
        return this.formQRValue() ? this.formQRValue() : "Scan QR Code"
    }

    renderQRButton = () => {
        const cancelButton = (
        <Button full danger onPress={this.handleCancelPress}>
            <Icon active type='FontAwesome' name='qrcode' />
            <Text>Cancel</Text>
        </Button>
        )
        const openButton = (
        <Button full onPress={this.handleOnPress}>
            <Icon active type='FontAwesome' name='qrcode' />
            <Text>{this.getButtonText()}</Text>
        </Button>
        )

        return this.state.isOpen ? cancelButton : openButton 
    }

    render = () => {
        return(
            <>
                {this.state.isOpen ? <QrScanner handleQRSubmit={this.handleQRSubmit} /> : null}
                {this.renderQRButton()}
            </>
        )
    }
}