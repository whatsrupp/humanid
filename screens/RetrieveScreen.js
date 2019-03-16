import React from 'react';

import {  Button, Container, Header, Separator, Content, Title, Body, Form, Text, Toast, View } from 'native-base';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Retrieve Data</Title></Body>
        </Header>
        <Content>
          <Text>Content</Text>
        </Content>
      </Container>
    );
  }

  
}
