import React, {Component} from 'react';
import { Picker, Container, ListItem, Radio, Header, Content, Title,Left, Right, Body, Form, Item, Input, Icon, Label, DatePicker, Separator, Text } from 'native-base';

export default class GenderPicker extends Component {

    onValueChange = (value) => {
        const fieldName = this.props.field.name
        this.props.form.setFieldValue(fieldName, value)
      }

    render = () => {
        return (
    <Item>
        <Icon active type='FontAwesome' name='transgender' />
      <Right>

      <Picker
        placeholder="Gender"
        mode="dropdown"
        iosHeader="Select Gender"
        iosIcon={<Icon name="arrow-down" />}
        selectedValue={this.props.field.value}
        onValueChange={this.onValueChange}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Unknown" value="unknown" />
      </Picker>
      </Right>

      </Item>
       )
    }
}