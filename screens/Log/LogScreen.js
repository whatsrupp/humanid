import React from 'react';
import * as Yup from 'yup';

import { Alert, Button, Container, ListItem, Header, Separator, Content, Title, Right, Body, Form, Icon, Text, View, Toast } from 'native-base';
import { Formik, Field, FieldArray } from 'formik';

import QrInput from './QrInput'
import GeolocationField from './GeolocationField';
import GenderPicker from './GenderPicker';
import RadioField from './RadioField';
import PhysicalEvidenceFields from './PhysicalEvidenceFields'
import CameraInput from './CameraInput';
import submitValuesToDatabase from './submitValuesToDatabase'

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
      <Container style={{marginBottom: 5}}>
        <Header>
          <Body><Title>Log Data</Title></Body>
        </Header>
        <Content>
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
            console.log(values)
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
                  type: 'warning'
                })
                return 
              }
              
              props.handleSubmit()
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

            <Field component={GeolocationField} name="geolocation"/> 
            {/* <GeolocationField /> */}
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

            <Separator bordered>
              <Text>Photos</Text>
            </Separator>
            <FieldArray component={CameraInput} name="photos" />
            <Button full style={ {zIndex: 2} } success onPress={handleSubmitButtonPress}><Text>Submit</Text></Button>
          </Form>
          )}}
        >
          </Formik>
        </Content>
      </Container>
      
    );
  }
}
