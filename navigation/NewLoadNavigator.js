import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DailyReportScreen from "../app/screens/DailyReportScreen";
import StationIdListScreen from "../app/screens/StationIdListScreen";

const Stack = createStackNavigator();

const NewLoadNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Add Load" component={DailyReportScreen} />
    <Stack.Screen name="Select Station" component={StationIdListScreen} />
  </Stack.Navigator>
);

export default NewLoadNavigator;
