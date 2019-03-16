import React from 'react';

import {  Card, Fab, Icon, Button, Container, Header, Separator, Content, Title, Body, Form, Text, Toast, View, CardItem, Thumbnail, Left } from 'native-base';
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
      isScanning: false,
      qrCode: null
    }
  }

  // componentDidMount = async () =>{
  //   const data = await getEntryByQrCode('5038681005996')
  //   await this.setState({data})

  // }

  handleQRSubmit = async (qrCode)=>{
    await this.setState({qrCode,isScanning: false, data})
    const data = await getEntryByQrCode(qrCode)
    await this.setState({data})

  }

  renderThumbnails = (urls)=>{
    const thumbnailSize = 50

    return(
        <ScrollView
        horizontal
      showsHorizontalScrollIndicator={true}>
              {urls.map((url, index)=>{

       return( <Thumbnail key={index} source={{uri: url}} style={{marginLeft: index == 0 ? 0 : 10, marginRight: 10, height: thumbnailSize, width: thumbnailSize, borderRadius: thumbnailSize/2}}/>)
      })}

        </ScrollView>
      )
  
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
    
    if(!data){
      return(
        <Card>
          <CardItem header>
            <Text>No Data Yet!</Text>
          </CardItem>
          <CardItem>
            <Text>Please Scan a QR code to retrieve data</Text>
          </CardItem>
        </Card>
      )
      
    }
    const {physicalEvidenceEntries, skin, qrCode, photoUrls, latitude, longitude, hair, gender, fingerprint, dateOfEntry} = data
    
    return(
      <Card>
        <CardItem header>
          <Text>Humanid Entry</Text>
        </CardItem>
        <CardItem header>
          <Text>General Information</Text>
        </CardItem>
        <CardItem>
          <Text>Recorded on: {dateOfEntry}</Text>
        </CardItem>
        <CardItem>
          <Text>QR Code: {qrCode}</Text>
        </CardItem>
        <CardItem>
          <Text>Gender: {gender.toUpperCase()}</Text>
        </CardItem>
        <CardItem>
          <Text>Longitude: {longitude}</Text>
        </CardItem>
        <CardItem>
          <Text>Latitude: {latitude}</Text>
        </CardItem>
        <CardItem header>
          <Text>Samples</Text>
        </CardItem>
        <CardItem>
          <Text>Fingerprint: {fingerprint === 1 ? 'True' : 'False'}</Text>
        </CardItem>

        <CardItem>
          <Text>Hair: {hair === 1 ? 'True' : 'False'}</Text>
        </CardItem>

        <CardItem>
          <Text>Skin Sample: {skin === 1 ? 'True' : 'False'}</Text>
        </CardItem>

        <CardItem header>
          <Text>Photos</Text>
        </CardItem>
        <CardItem>
        {this.renderThumbnails(photoUrls)}
        </CardItem>

        <CardItem header>
          <Text>Physical Evidence</Text>
        </CardItem>

        {physicalEvidenceEntries.map((entry, index) => {
          return(
            <CardItem key={index}>
              <Text>{entry}</Text>
            </CardItem>      
          )
        })}


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
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ isScanning: !this.state.isScanning })}>
            <Icon active type='FontAwesome' name='qrcode' />
          </Fab>
      </Container>
    );
  }

  
}
