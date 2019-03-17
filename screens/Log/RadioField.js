import React, {Component} from 'react'

import { Picker, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text, View } from 'native-base';
import {Switch} from 'react-native'
export default class RadioField extends Component {
    
    handlePress = () => {
        const fieldName = this.props.field.name;
        const currentValue = this.props.field.value;
        this.props.form.setFieldValue(fieldName, !currentValue)
    }

    render = () => {
     return(
    <ListItem >
    <View style={{marginRight: 10, width: 50}}>
      <Icon active type={this.props.iconType} name={this.props.iconName} />
    </View>
    <Left>
      <Text>{this.props.title}</Text>
    </Left>
    <Right>
      <Switch onValueChange={this.handlePress} value={this.props.field.value} /> 
    </Right>
    </ListItem>
     )
    }
}


