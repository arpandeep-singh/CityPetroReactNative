import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../app/screens/LoginScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
