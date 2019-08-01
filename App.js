import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './src/HomeScreen';
import RegisterScreen from './src/RegisterScreen';
import { YellowBox } from 'react-native';
import AppNavigation from './src/AppNavigation';

export default class App extends Component {
  constructor(props) {
    super(props)

    // console.disableYellowBox = true
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillUpdate is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    this.state = {
       
    }
  }
  
  render() {
    return (
      //<HomeScreen/>
      //<RegisterScreen/>
      <AppNavigation/>
    )
  }
}
