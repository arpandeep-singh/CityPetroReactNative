import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function UploadScreen({ progress = 0, visible = false, onDone, error }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
          />
        ) : !error ? (
          <LottieView
            autoPlay
            loop={false}
            style={styles.animation}
            source={require("../assets/animations/done.json")}
            onAnimationFinish={onDone}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            style={styles.animation}
            source={require("../assets/animations/failed.json")}
            onAnimationFinish={onDone}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 150,
  },
});

export default UploadScreen;
