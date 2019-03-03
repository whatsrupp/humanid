import React from 'react';


import { Button, Container, ListItem, Header, Separator, Content, Title, Right, Body, Form, Icon, Text } from 'native-base';
import { Formik, Field } from 'formik';

import QrInput from './QrInput'
import GeolocationField from './GeolocationField';
import GenderPicker from './GenderPicker';
import RadioField from './RadioField';
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
            <Separator bordered>
              <Text>General Information</Text>
            </Separator>
            <ListItem>
                <Icon active type='FontAwesome' name='calendar' />
                <Right>
                  <Text>{new Date().toLocaleDateString()}</Text>
                </Right>
            </ListItem>


            <GeolocationField />
            <Field component={GenderPicker} name='gender' />
            <Separator bordered>
              <Text>Forensic Evidence</Text>
            </Separator>
            <Field component={RadioField} title="Fingerprint" name="fingerprint" iconName="fingerprint" iconType="MaterialIcons"/>
            <Field component={RadioField} title="Skin Sample" name="skinSample" iconName="user" iconType="FontAwesome"/>
            <Field component={RadioField} title="Hair" name="hair" iconName="scissors" iconType="Feather"/>
            <Separator bordered>
              <Text>Physical Evidence</Text>
            </Separator>
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
