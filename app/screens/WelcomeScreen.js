import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
} from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={6}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.tagline}>City Petroleum Transport</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          color={colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton title="Register" color={colors.secondary}></AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
    color: colors.white,
    textTransform: "uppercase",
  },
});

export default WelcomeScreen;
