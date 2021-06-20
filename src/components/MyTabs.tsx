import React from "react";
import { BottomTabBarOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ArticlesFeed from "./ArticlesFeed";
import VideosFeed from "./VideosFeed";
import { StackNavigationOptions } from "@react-navigation/stack";
import { IGN_RED } from "../theme";

const Tab = createBottomTabNavigator();

const headerBarOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: IGN_RED
  }
}

const sharedTabBarOptions: BottomTabBarOptions = {
  activeTintColor: IGN_RED,
  inactiveTintColor: "grey",
  tabStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  labelStyle: {
    fontSize: 24,
    fontWeight: "500",
    paddingVertical: 40
  },
}

const MyTabs = () => (
  <Tab.Navigator tabBarOptions={sharedTabBarOptions}>
    <Tab.Screen name="Articles" component={ArticlesFeed} options={headerBarOptions} />
    <Tab.Screen name="Videos" component={VideosFeed} options={headerBarOptions} />
  </Tab.Navigator>
);

export default MyTabs;
