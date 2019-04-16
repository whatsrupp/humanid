import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import { Picker, Button, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text } from 'native-base';


export default class GeolocationField extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  updateFormValues = ({longitude, latitude}) => {
    this.props.form.setFieldValue('longitude', longitude)
    this.props.form.setFieldValue('latitude', latitude)

  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.updateFormValues({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    })
    this.setState({ location });
  };

  render() {
    const text = 'Waiting..';
    let longitudeText = text;
    let latitudeText = text;
    if (this.state.errorMessage) {
      longitudeText = this.state.errorMessage;
      latitudeText = this.state.errorMessage;
    } else if (this.state.location) {
      longitudeText = this.state.location.coords.longitude.toFixed(5);
      latitudeText = this.state.location.coords.latitude.toFixed(5);

    }

    return (
      <ListItem>
        <View style={{width: 40, marginRight: 10, flex: 1}}>
          <Icon active type='FontAwesome' name='map-marker'/>
        </View>
        <Text style={{marginRight: 10}}>Longitude: {longitudeText}</Text> 
        <Text>Latitude: {latitudeText}</Text>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});