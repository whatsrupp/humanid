import React from 'react';
import * as Yup from 'yup';

import {  Button, Container, Header, Separator, Content, Title, Body, Form, Text, Toast, Fab, Icon } from 'native-base';
import { Formik, Field, FieldArray } from 'formik';

import QrInput from './QrInput'
import GeolocationField from './GeolocationField';
import GenderPicker from './GenderPicker';
import RadioField from './RadioField';
import PhysicalEvidenceFields from './PhysicalEvidenceFields'
import CameraInput from './CameraInput';
import submitValuesToDatabase from './submitValuesToDatabase'
import DateField from './DateField';

const formSchema = Yup.object().shape({
  qrCode: Yup.string().required('Please scan a QR code'),
  gender: Yup.string().required('Please select a gender'),
  photos: Yup.array().of(Yup.string()),
  physicalEvidenceEntries: Yup.array().of(Yup.string()),
  fingerprint: Yup.bool().required('Required'),
  hair: Yup.bool().required('Required'),
  skin: Yup.bool().required('Required'),
  longitude: Yup.number().required('Required'),
  latitude: Yup.number().required('Required'),
});


export default class LogScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Formik
          initialValues={{
            hair: false,
            skin: false,
            fingerprint: false,
            physicalEvidenceEntries: [],
            photos: []
          }}
          validationSchema={formSchema}
          onSubmit={async (values, actions) => {
            try{
              await submitValuesToDatabase(values)
            }catch(err){
              console.log(err)
            }
              
          }}
          render={props =>{

            const handleSubmitButtonPress = () =>{
              props.validateForm()
              const errorKeys = Object.keys(props.errors)
              if(errorKeys.length > 0){
                let errorString = ""
                errorKeys.forEach((key, index)=>{
                  errorString += props.errors[key]
                  if(index+1 != Object.keys(props.errors).length){
                    errorString += "\n"
                  }
                })
                Toast.show({
                  text: errorString,
                  position: 'bottom',
                  duration: 5000,
                  buttonText: 'Okay',
                })
                return 
              }
              
              props.handleSubmit()
            }

            return(
              <Container >
              <Header>
                <Body><Title>Log Data</Title></Body>
              </Header>
              <Content>
                <Form>
                  <Separator >
                    <Text>General Information</Text>
                  </Separator>
                  <Field component={QrInput} name="qrCode"/>
                  <Field component={DateField} name="date" /> 
                  <Field component={GeolocationField} name="geolocation"/> 
                  <Field component={GenderPicker} name='gender' />
                  <Separator >
                    <Text>Forensic Evidence</Text>
                  </Separator>
                  <Field component={RadioField} title="Fingerprint" name="fingerprint" iconName="fingerprint" iconType="MaterialIcons"/>
                  <Field component={RadioField} title="Skin Sample" name="skinSample" iconName="user" iconType="FontAwesome"/>
                  <Field component={RadioField} title="Hair" name="hair" iconName="scissors" iconType="Feather"/>
                  <Separator bordered>
                    <Text>Physical Evidence</Text>
                  </Separator>
                  <FieldArray name="physicalEvidenceEntries" component={PhysicalEvidenceFields} />

                  <Separator >
                    <Text>Photos</Text>
                  </Separator>
                  <FieldArray component={CameraInput} name="photos" />
                </Form>
                </Content>
                <Fab
                  style={{ backgroundColor: '#32CD32', zIndex: 1000}}
                  position="bottomRight"
                  onPress={handleSubmitButtonPress}
                  >
                  <Icon active type='FontAwesome' name='save' />
                </Fab>
              </Container>
          )}}>
      </Formik>
      
    )}
}
