import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import NewLoadNavigator from "./NewLoadNavigator";

const Stack = createStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Dashboard"
      component={AppNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Add Load"
      component={NewLoadNavigator}
      options={{
        headerShown: true,
      }}
      options={{ animationEnabled: true }}
    />
  </Stack.Navigator>
);

export default RootStackNavigator;
