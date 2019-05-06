import React, { Component } from 'react';
import { Picker, Right, Item, Icon } from 'native-base';

export default class GenderPicker extends Component {
  onValueChange = value => {
    const { field, form } = this.props;
    const fieldName = field.name;
    form.setFieldValue(fieldName, value);
  };

  render = () => {
    return (
      <Item>
        <Icon active type="FontAwesome" name="transgender" />
        <Right>
          <Picker
            placeholder="Gender"
            mode="dropdown"
            iosHeader="Select Gender"
            iosIcon={<Icon name="arrow-down" />}
            supportedOrientations={[
              'Portrait',
              'Landscape',
              'Landscape-left',
              'Landscape-right'
            ]}
            selectedValue={this.props.field.value}
            onValueChange={this.onValueChange}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        </Right>
      </Item>
    );
  };
}
