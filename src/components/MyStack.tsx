import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IGNLogo from "./IGNLogo";
import MyTabs from "./MyTabs";
import { IGN_RED } from "../theme";
import Web from "./Web";

export type MyStackParamsList = {
  Home: undefined
  Web: {
    url: string
  }
}

const Stack = createStackNavigator<MyStackParamsList>();

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{
        headerStyle: {
          backgroundColor: IGN_RED
        },
        headerTitle: () => <IGNLogo height={20} width={60} color="white" />
      }}
      component={MyTabs}
    />
    <Stack.Screen
      name="Web"
      component={Web}
      options={{ headerBackTitleVisible: false, headerTitle: "" }}
    />
  </Stack.Navigator>
);

export default MyStack;
