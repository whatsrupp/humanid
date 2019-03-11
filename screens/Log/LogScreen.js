import React from 'react';


import { Alert, Button, Container, ListItem, Header, Separator, Content, Title, Right, Body, Form, Icon, Text, View } from 'native-base';
import { Formik, Field, FieldArray } from 'formik';

import QrInput from './QrInput'
import GeolocationField from './GeolocationField';
import GenderPicker from './GenderPicker';
import RadioField from './RadioField';
import PhysicalEvidenceFields from './PhysicalEvidenceFields'
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

            const handleSubmitButtonPress = () =>{
              props.handleSubmit()
              alert('Miranda Smells')
            }
            return(
          <Form>
            <QrInput {...props} />
            <Separator bordered>
              <Text>General Information</Text>
            </Separator>
            <ListItem>
              <View style={{flex:1}}>
                <Icon active type='FontAwesome' name='calendar' />
              </View>
                  <Text>{new Date().toLocaleDateString()}</Text>
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
            <FieldArray name="physicalEvidenceEntries" component={PhysicalEvidenceFields} />
            <Button full success onPress={handleSubmitButtonPress}><Text>Submit</Text></Button>
          </Form>
          )}}
        >
          </Formik>
        </Content>
      </Container>
      
    );
  }
}
