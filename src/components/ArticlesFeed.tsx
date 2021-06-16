import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ArticlesFeed = () => {
  return (
    <View style={styles.root}>
      <Text>Hello, World - Articles</Text>
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

export default ArticlesFeed;
