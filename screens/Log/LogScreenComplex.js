import React from 'react';


import { Picker, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text } from 'native-base';
import { Formik } from 'formik';


import { MonoText } from '../../components/StyledText';

import FormTest from './Form'
export default class LogScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fingerprint: false,
      hair: false,
      skin: false,
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
        <Formik>
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
              <Right>

              <Picker
                placeholder="Gender"
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
              </Right>
        
              </Item>

              <Separator bordered>
              <Text>Forensic Evidence</Text>
            </Separator>

              <ListItem>
              <Left>
                <Text>Fingerprint</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
            </ListItem>

            <ListItem>
              <Left>
                <Text>Skin Sample</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
            </ListItem>

            <ListItem>
              <Left>
                <Text>Hair</Text>
              </Left>
              <Right>
                <Radio selected={this.state.hair}/>
              </Right>
            </ListItem>
            <Separator bordered>
              <Text>Physical Evidence</Text>
            </Separator>
            <Item>
                <Input placeholder='Add physical evidence'/>
            </Item>

            </Form>
          </Formik>
        </Content>
      </Container>
      
    );
  }
}
