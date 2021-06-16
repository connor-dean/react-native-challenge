import React from "react";
import { StyleSheet, View, Text } from "react-native";

const VideosFeed = () => {
  return (
    <View style={styles.root}>
      <Text>Hello, World - Videos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

export default VideosFeed;
