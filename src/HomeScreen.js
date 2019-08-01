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
import AsyncStorage from "@react-native-community/async-storage";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  async componentDidMount() {
    let isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn != null && isLoggedIn == "yes") {
      // Auto fill username and password
      let regUsername = await AsyncStorage.getItem("username");
      let regPassword = await AsyncStorage.getItem("password");

      this.setState({
        username: regUsername,
        password: regPassword
      });
    }
  }

  onClickLoginBtn = async () => {
    let regUsername = await AsyncStorage.getItem("username");
    let regPassword = await AsyncStorage.getItem("password");

    const { username, password } = this.state;
    if (username != regUsername) {
      // Invalid Username
      //alert(JSON.stringify(username));
      alert("Invalid Username");
    } else if (password != regPassword) {
      // Invalid Password
      alert("Invalid Password");
    }else{
      // Login Successfully
      // alert("Login Successfully")
      await AsyncStorage.setItem("isLoggedIn", "yes")
      this.props.navigation.navigate("AppSceme")
    }
  };

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/img/bg.png")}
      >
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
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingTop: 16,
              alignItems: "center"
            }}
          >
            <Icon name="user" size={35} />
            <TextInput
              value={this.state.username}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              keyboardType="email-address"
              style={{
                flex: 1,
                borderColor: "#84A8E3",
                borderWidth: 1,
                marginLeft: 16,
                height: 45,
                borderRadius: 5,
                padding: 10
              }}
              placeholder="User name"
            />
          </View>

          {/* Password Section */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingTop: 16,
              alignItems: "center"
            }}
          >
            <Icon name="lock" size={35} />
            <TextInput
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
              style={{
                flex: 1,
                borderColor: "#84A8E3",
                borderWidth: 1,
                marginLeft: 16,
                height: 45,
                borderRadius: 5,
                padding: 10
              }}
              placeholder="Password"
            />
          </View>

          {/* Login Button */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.onClickLoginBtn}
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
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
              marginBottom: 24,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
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
                Register
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

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {await AsyncStorage.removeItem("isLoggedIn")}}
        style={{ padding: 10 }}>
       <Text style={{color:"white"}}>Logout</Text>
      </TouchableOpacity>
    )
  };
};
