import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LogScreen from '../screens/Log/LogScreen';
import RetrieveScreen from '../screens/Retrieve/RetrieveScreen';

const LogStack = createStackNavigator({
  Log: LogScreen
});

LogStack.navigationOptions = {
  tabBarLabel: 'Log Data',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
    />
  )
};

const RetrieveStack = createStackNavigator({
  Retrieve: RetrieveScreen
});

RetrieveStack.navigationOptions = {
  tabBarLabel: 'Retrieve Data',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  )
};

export default createBottomTabNavigator({
  LogStack,
  RetrieveStack
});
