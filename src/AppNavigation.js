import React, { Component } from "react";
import { Image } from "react-native";

import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import JSONFeedScreen from "./JSONFeedScreen";
import CameraScreen from "./CameraScreen";
import YoutubeScreen from "./YoutubeScreen";

const TabScreens = createBottomTabNavigator({
  Tab1: {screen: JSONFeedScreen, 
    navigationOptions: {
      tabBarLabel: "JSON",
      tabBarIcon: ({ focused }) => (
        <Image
          style={{
            height: 28,
            width: 28
          }}
          resizeMode="contain"
          source={
            focused
              ? require("./assets/img/ic_profile_select.png")
              : require("./assets/img/ic_profile.png")
          }
        />
      )
    }},
  Tab2: {screen: CameraScreen,
    navigationOptions: {
      tabBarLabel: "Camera",
      tabBarIcon: ({ focused }) => (
        <Image
          style={{
            height: 28,
            width: 28
          }}
          resizeMode="contain"
          source={
            focused
              ? require("./assets/img/ic_card_select.png")
              : require("./assets/img/ic_card.png")
          }
        />
      )
    }
  }
},{
  initialRouteName: "Tab1"
})

const AppStack = createStackNavigator({
  Tabs: {screen: TabScreens},
  Youtube: {screen: YoutubeScreen}
}, {initialRouteName: "Tabs"})

TabScreens.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
 
  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;
 
  return {
    headerTitle,
    headerStyle: { backgroundColor: '#339CED'},
    headerTitleStyle: { color: "#fff" },

  };
 };

const AutenStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Register: { screen: RegisterScreen }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthenScene:  AutenStack,
    AppSceme: AppStack
  }, {
    initialRouteName: 'AuthenScene'
  }
));
