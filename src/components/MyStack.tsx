import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IGNLogo from "./IGNLogo";
import MyTabs from "./MyTabs";
import { IGN_RED } from "../theme";

const Stack = createStackNavigator();

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
  </Stack.Navigator>
);

export default MyStack;
