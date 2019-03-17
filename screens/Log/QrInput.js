import React, {Component} from 'react'
import { Button, Icon, Text, ListItem, View, Fab } from 'native-base';
import { Modal} from 'react-native'
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
        return this.props.form.setFieldValue('qrCode', qrValue)
    }

    formQRValue = () => {
        return this.props.form.values.qrCode
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

    renderQR = () => {
        if(!this.state.isOpen) return null 
        return (<Modal
          animationType="slide"
          >
          <QrScanner handleQRSubmit={this.handleQRSubmit} />
          <Fab
                style={{backgroundColor: '#FF6347' }}
                position="bottomRight"
                onPress={() => this.setState({ isOpen: !this.state.isOpen })}>
                <Icon active type='FontAwesome' name='qrcode' />
              </Fab>
        </Modal>)
      }

    render = () => {
        return(
            <>
                <ListItem onPress={this.handleOnPress}>
                    <View style={{width: 40, marginRight: 10, flex: 1}}>
                    <Icon active type='FontAwesome' name='qrcode'/>
                    </View>
                    <Text style={{color:"#3299CC"}}>{this.getButtonText()}</Text>
                </ListItem>
                {this.renderQR()}
            </>
        )
    }
}