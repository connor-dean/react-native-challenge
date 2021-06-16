import React from "react";
import { BottomTabBarOptions, BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ArticlesFeed from "./Articles/ArticlesFeed";
import VideosFeed from "./VideosFeed";
import { StackNavigationOptions } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

// TODO
const headerBarOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "red"
  }
}

// TODO change fontWeight on selection
const sharedTabBarOptions: BottomTabBarOptions = {
  activeTintColor: "red",
  inactiveTintColor: "grey",
  tabStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  labelStyle: {
    fontSize: 24,
    fontWeight: "500",
    paddingVertical: 20
  },
}

const MyTabs = () => (
  <Tab.Navigator tabBarOptions={sharedTabBarOptions}>
    <Tab.Screen name="Articles" component={ArticlesFeed} options={headerBarOptions} />
    <Tab.Screen name="Videos" component={VideosFeed} options={headerBarOptions} />
  </Tab.Navigator>
);

export default MyTabs;
