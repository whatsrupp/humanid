import React from 'react';

import {  Card, Fab, Icon, Button, Container, Header, Separator, Content, Title, Body, Form, Text, Toast, View, CardItem } from 'native-base';
import QRScanner from '../Log/QrScanner'
import {getEntryByQrCode} from './requests/getEntry'
import { Image, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    this.state = {
      data: null,
      isScanning: true,
      qrCode: null
    }
  }

  handleQRSubmit = async (qrCode)=>{
    await this.setState({qrCode,isScanning: false, data})
    const data = await getEntryByQrCode(qrCode)
    await this.setState({data})

  }

  hasData = ()=>{
    return !!this.state.data
  }

  renderQR = () => {
    if(!this.state.isScanning) return null 
    return (<Modal
      animationType="slide"
      >
      <QRScanner handleQRSubmit={this.handleQRSubmit} />
      <Fab
            style={{backgroundColor: '#FF6347' }}
            position="bottomRight"
            onPress={() => this.setState({ isScanning: !this.state.isScanning })}>
            <Icon active type='FontAwesome' name='qrcode' />
          </Fab>
    </Modal>)
  }

  renderDataDisplay = ()=>{
    const data = this.state.data
    
    return(
      <Card>
        <CardItem header>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem>
          <Text>Hello</Text>
        </CardItem>
      </Card>
    )
  }

  render = () => {
    return (
      <Container>

        {this.renderQR()}
        <Header>
          <Body><Title>Retrieve Data</Title></Body>
        </Header>
        <Content>
        
          {this.renderDataDisplay()}


        </Content>
          <Fab
            style={{zIndex: 100000, backgroundColor: this.state.isScanning ? '#FF6347':'#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ isScanning: !this.state.isScanning })}>
            <Icon active type='FontAwesome' name='qrcode' />
          </Fab>
      </Container>
    );
  }

  
}
