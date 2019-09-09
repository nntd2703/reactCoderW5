import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  parsingNumberToDateTime,
  screenWidthWithPadding
} from "../utils/functionUtils";

export default class ItemNewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.content}>
          <Text style={styles.title}> {data.title} </Text>
          <Text style={styles.fromNow}>
            {parsingNumberToDateTime(data.time)}
          </Text>
        </View>
        <Image
          style={styles.imageContent}
          source={{
            uri: data.thumb
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  content: {
    flex: 2,
  },
  imageContent: {
    flex: 1,
    width: screenWidthWithPadding * 0.25,
    height: 100,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
  },
  fromNow: {
    fontSize: 14,
    color: "grey",
    paddingTop: 10,
    bottom: 0,
  }
});
