import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Moment from "react-moment";
import AsyncStorage from "@react-native-community/async-storage";

class CMEntry extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingTop: 16,
          alignItems: "center"
        }}
      >
        {/* <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "#84A8E3",
                borderRadius: 50
              }}
            /> */}
        <Icon name={this.props.icon} size={35} />

        <TextInput
          autoCapitalize="none"
          onChangeText={this.props.onChangeValue}
          secureTextEntry={this.props.isPassword}
          keyboardType={this.props.isEmail ? "email-address" : null}
          style={{
            flex: 1,
            borderColor: "#84A8E3",
            borderWidth: 1,
            marginLeft: 16,
            height: 45,
            borderRadius: 5,
            padding: 10
          }}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      username: "",
      password: ""
    };
  }

  // Arrow Function
  onClickRegisterBtn = async () => {
    // alert(JSON.stringify(this.state));
    await AsyncStorage.setItem("username", this.state.username);
    await AsyncStorage.setItem("password", this.state.password);
    this.props.navigation.goBack();
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/img/bg.png")}
      >
        <Text>{this.state.time}</Text>
        <Moment element={Text} format="DD/mm/YYYY hh/MM/SS">
          {this.state.time}
        </Moment>

        {/* auten section */}
        <View
          style={{
            height: "auto",
            backgroundColor: "#fff7",
            marginHorizontal: 16,
            marginTop: 16,
            paddingTop: 16,
            borderRadius: 10
          }}
        >
          {/* Username Section */}
          <CMEntry
            onChangeValue={text => {
              this.setState({ username: text });
            }}
            icon="user"
            placeholder="Username"
            isEmail={true}
          />

          {/* Password Section */}
          <CMEntry
            onChangeValue={text => {
              this.setState({ password: text });
            }}
            icon="lock"
            placeholder="Password"
            isPassword
          />

          {/* Register Button */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.onClickRegisterBtn}
              style={{
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3666A8",
                padding: 12
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cancel Button */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
              marginBottom: 24,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3666A820",
                padding: 12
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={require("./assets/img/header_react_native.png")}
          resizeMode="center"
          style={{ marginTop: 16, height: 100, width: null }}
        />
      </ImageBackground>
    );
  }
}

RegisterScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Register",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " "
  };
};
