// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AppLoading } from "expo";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/LoginScreen";
import navigationTheme from "./navigation/navigationTheme";
import RootStackNavigator from "./navigation/RootStackNavigator";
import { navigationRef } from "./navigation/rootNavigation";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <RootStackNavigator /> : <LoginScreen />}
      </NavigationContainer>
      {/* <DailyReportScreen /> */}
    </AuthContext.Provider>
  );
}
