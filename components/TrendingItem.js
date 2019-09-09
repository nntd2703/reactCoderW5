import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { parsingNumberToDateTime, } from "../utils/functionUtils";

export default class TrendingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.cover }} />
        <View style={styles.contentPanel}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.summaryText}>{item.summary}</Text>
          <Text style={styles.fromNow}>
            {parsingNumberToDateTime(item.time)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 300,
    width: Math.round(Dimensions.get("window").width) - 30,
    borderRadius: 12
  },
  contentPanel: {
    paddingVertical: 20
  },
  summaryText: {
    paddingTop: 10,
    fontSize: 18,
    color: "grey"
  },
  titleText: {
    fontSize: 25,
    fontWeight: "500"
  },
  fromNow: {
    fontSize: 14,
    color: "grey",
    paddingTop: 10,
  }
});
