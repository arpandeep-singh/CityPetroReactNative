import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../app/screens/AccountScreen";
import InvoicesScreen from "../app/screens/InvoicesScreen";
import ReportsScreen from "../app/screens/ReportsScreen";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Earnings" component={ReportsScreen} />
    <Stack.Screen name="Invoices" component={InvoicesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
