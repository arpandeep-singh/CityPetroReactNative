import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../app/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function NewLoadButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.primary}
          size={48}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: colors.primary,
    borderColor: colors.white,
    //borderWidth: 10,
    bottom: 20,
    height: 80,
    width: 80,
    //borderRadius: 40,
  },
});

export default NewLoadButton;
