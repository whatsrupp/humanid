import React, { Component } from 'react';

import { ListItem, Left, Right, Icon, Text, View } from 'native-base';
import { Switch } from 'react-native';

export default class RadioField extends Component {
  handlePress = () => {
    const { field, form } = this.props;
    const fieldName = field.name;
    const currentValue = field.value;
    form.setFieldValue(fieldName, !currentValue);
  };

  render = () => {
    const { iconType, iconName, title, field } = this.props;
    return (
      <ListItem>
        <View style={{ marginRight: 10, width: 50 }}>
          <Icon active type={iconType} name={iconName} />
        </View>
        <Left>
          <Text>{title}</Text>
        </Left>
        <Right>
          <Switch onValueChange={this.handlePress} value={field.value} />
        </Right>
      </ListItem>
    );
  };
}
