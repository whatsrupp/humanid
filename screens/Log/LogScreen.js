import React from 'react';


import { Button, Container, ListItem, Header, Content, Title, Right, Body, Form, Icon, Text } from 'native-base';
import { Formik, Field } from 'formik';

import QrInput from './QrInput'
import GeolocationField from './GeolocationField';
import GenderPicker from './GenderPicker';
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
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            console.log(values)
          }}
          render={props =>{
            return(
          <Form>
            <QrInput {...props} />
            <ListItem>
                <Icon active type='FontAwesome' name='calendar' />
                <Right>
                  <Text>{new Date().toLocaleDateString()}</Text>
                </Right>
            </ListItem>

            <GeolocationField />
            <Field component={GenderPicker} name='gender' />
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
