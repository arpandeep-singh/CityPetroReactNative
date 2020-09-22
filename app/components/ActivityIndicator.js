import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/dotLoader.json")}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ActivityIndicator;
