import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Constants } from 'expo';
import { Formik } from 'formik';


export default class Form extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
         Formik x React Native
        </Text>
        <Formik 
          initialValues={{ firstName: 'Touch me' }} 
          onSubmit={values => console.log(values)}>
          {({ handleChange, handleSubmit, values }) => (
            <View>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: 300,
                padding: 8,
                fontSize: 18
              }}
              onChangeText={handleChange('firstName')}
              value={values.firstName}
            />
            <Button onPress={handleSubmit} title="submit" color="#841584" />
            </View>
          )}
        </Formik>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 100,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

