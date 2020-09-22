import React from "react";
import colors from "../config/colors";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Searchbar() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    marginTop: 20,
    // marginHorizontal: 20,
    paddingHorizontal: 20,
    padding: 10,
    //borderWidth: StyleSheet.hairlineWidth,
  },
});

export default Searchbar;
