import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'

const navigator = createStackNavigator({
  Home:HomeScreen
},{
  initialRouteName:'Home',
  defaultNavigationOptions:{
    title:'Find Me'
  }
}
)

export default createAppContainer(navigator);