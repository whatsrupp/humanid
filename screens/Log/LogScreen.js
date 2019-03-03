import React from 'react';


import { Picker, Button, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text } from 'native-base';
import { Formik } from 'formik';


import { MonoText } from '../../components/StyledText';
import QrScanner from './QrScanner'
import FormTest from './Form'

import QrInput from './QrInput'
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
        {/* <QrScanner /> */}
        <Header>
          <Body><Title>Log Data</Title></Body>
        </Header>
        <Content>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            console.log(values)
          }}
          render={props =>{
            return(
          <Form>
            <QrInput {...props} />
            <Item>
                <Icon active type='FontAwesome' name='calendar' />
                <Text>{new Date().toLocaleDateString()}</Text>
                <Input placeholder='Date of Disaster'/>
            </Item>
            <Button full success onPress={props.handleSubmit}><Text>Submit</Text></Button>
          </Form>
          )}}
        >
          </Formik>
        </Content>
      </Container>
      
    );
  }
}
