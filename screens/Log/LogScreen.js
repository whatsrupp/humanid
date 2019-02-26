import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';

import { Picker, Container, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker } from 'native-base';


import { MonoText } from '../../components/StyledText';

import FormTest from './Form'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 'key0',
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }


  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Log Data</Title></Body>
        </Header>
        <Content>
        <Form>
            <Item>
              <Icon active type='FontAwesome' name='qrcode' />
              <Input placeholder='Scan QR Code'/>
            </Item>
            <Item>
              <Icon active type='FontAwesome' name='map-marker' />
              <Input placeholder='Place of Disaster'/>
            </Item>
            <Item>
              <Icon active type='FontAwesome' name='calendar' />
              <Input placeholder='Date of Disaster'/>
            </Item>
            <Item>
            <Icon active type='FontAwesome' name='transgender' />

            <Picker
              mode="dropdown"
              iosHeader="Select Gender"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}

            >
              <Picker.Item label="Male" value="key0" />
              <Picker.Item label="Female" value="key1" />
              <Picker.Item label="Unknown" value="key2" />
            </Picker>
            </Item>

          </Form>
        </Content>
      </Container>
      // <View style={styles.container}>
      //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //       <Button title={'Scan QR Code'} onPress={()=>{console.log('yo')}}/>
      //       <Button title={'Fill In Details'} onPress={()=>{console.log('yo')}}/>
      //       <Button title={'Take Photos'} onPress={()=>{console.log('yo')}}/>
            
      //       <TextInput          
      //         onChangeText={(text) => this.setState({text})}
      //         value={this.state.text}>
      //       </TextInput>

      //       <Form />

      //   </ScrollView>

      //   <View style={styles.tabBarInfoContainer}>

      //     <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
      //       <MonoText style={styles.codeHighlightText}>Hello Miranda</MonoText>
      //     </View>
      //   </View>
      // </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
