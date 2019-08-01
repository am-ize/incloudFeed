import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Card } from "react-native-elements";

export default class JSONFeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      youtubes: []
    };
  }

  // static navigationOptions = {
  //   header: null
  // };

  componentDidMount() {
    this.feedData();
  }

  feedData = async () => {
    // let result = await axios.get(
    //   "http://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=foods"
    // );

    this.setState({ isFetching: true });
    let url = "http://codemobiles.com/adhoc/youtubes/index_new.php";
    let regUsername = await AsyncStorage.getItem("username");
    let regPassword = await AsyncStorage.getItem("password");

    let params = `username=${regUsername}&password=${regPassword}&type=foods`;
    let headers = { "content-type": "application/x-www-form-urlencoded" };
    let response = await axios.post(url, params, { headers });
    this.setState({ youtubes: response.data.youtubes, isFetching: false });
  };

  renderHeader = () => (
    <Image
      source={require("./assets/img/header_react_native.png")}
      style={styles.list_header}
      resizeMode="center"
    />
  );

  renderItem = ({ item, index }) => (
    <TouchableOpacity>
      <Card containerStyle={styles.listCard}>
        {/* Top section */}
        <View style={styles.listCardView}>
          <Image
            source={{ uri: item.avatar_image }}
            style={styles.listAvatar}
          />
          {/* Title and sub title */}
          <View style={styles.listTitle}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listSubTitle}>{item.subtitle}</Text>
          </View>
        </View>

        {/* Bottom section */}
        <Image
          source={{ uri: item.youtube_image }}
          style={styles.listYoutbeImage}
        />
      </Card>
    </TouchableOpacity>
  );

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/bg.png")}
        style={styles.container}
      >
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this.feedData}
          ListHeaderComponent={this.renderHeader()}
          style={styles.listCard}
          data={this.state.youtubes}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list_header: {
    width: "100%",
    height: 100
  },
  listCard: {
    overflow: "hidden",
    flexDirection: "column",
    marginBottom: 20,
    borderRadius: 10,
    padding: 0
  },
  listCardView: {
    flexDirection: "row",
    marginBottom: 16,
    height: 45,
    alignItems: "center"
  },
  listAvatar: {
    width: 45,
    height: "100%",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 16,
    borderRadius: 50
  },
  listTitleSubtitleContainer: {
    flexDirection: "column",
    marginRight: 16,
    flex: 1
  },
  listTitle: {
    fontWeight: "700"
  },
  listSubTitle: {
    fontWeight: "100"
  },
  listYoutbeImage: {
    width: "100%",
    height: 190
  }
});
