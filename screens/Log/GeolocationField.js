import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import { ListItem, Icon, Text } from 'native-base';

export default class GeolocationField extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  updateFormValues = ({ longitude, latitude }) => {
    const { form } = this.props;
    form.setFieldValue('longitude', longitude);
    form.setFieldValue('latitude', latitude);
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.updateFormValues({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
    this.setState({ location });
  };

  render() {
    const text = 'Waiting..';
    const { location, errorMessage } = this.state;
    let longitudeText = text;
    let latitudeText = text;
    if (errorMessage) {
      longitudeText = errorMessage;
      latitudeText = errorMessage;
    } else if (location) {
      longitudeText = location.coords.longitude.toFixed(5);
      latitudeText = location.coords.latitude.toFixed(5);
    }

    return (
      <ListItem>
        <View style={{ width: 40, marginRight: 10, flex: 1 }}>
          <Icon active type="FontAwesome" name="map-marker" />
        </View>
        <Text style={{ marginRight: 10 }}>Longitude: {longitudeText}</Text>
        <Text>Latitude: {latitudeText}</Text>
      </ListItem>
    );
  }
}
