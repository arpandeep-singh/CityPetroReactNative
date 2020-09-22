import jwtDecode from "jwt-decode";
import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

import expoPushTokensApi from "../api/expoPushTokens";
import { Notifications } from "expo";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };
  const logout = async () => {
    setUser(null);
    const pushToken = await Notifications.getExpoPushTokenAsync();
    expoPushTokensApi.removePushToken(pushToken);

    authStorage.removeToken();
  };

  return { user, logout, logIn };
};
