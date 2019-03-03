import React, {Component} from 'react'

import { Picker, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text } from 'native-base';

export default class RadioField extends Component {
    
    handlePress = () => {
        const fieldName = this.props.field.name;
        const currentValue = this.props.field.value;
        this.props.form.setFieldValue(fieldName, !currentValue)
    }

    render = () => {
     return(
    <ListItem onPress={this.handlePress}>
    <Icon active type={this.props.iconType} name={this.props.iconName} />
    <Left>
      <Text>{this.props.title}</Text>
    </Left>
    <Right>
      <Radio selected={this.props.field.value} />
    </Right>
    </ListItem>
     )
    }
}


