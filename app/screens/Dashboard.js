import React, { useContext } from "react";
import Screen from "../components/Screen";
import { View, StyleSheet, Text, Platform, useColorScheme } from "react-native";
import colors from "../config/colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../auth/context";

function Dashboard(props) {
  const { user } = useContext(AuthContext);
  return (
    <Screen style={styles.screen}>
      <View>
        <View style={styles.circle} />
        <View
          style={{
            paddingVertical: 20,
            marginVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text style={[styles.tagline, { fontSize: 18 }]}>Welcome,</Text>
          <Text style={styles.tagline}>{user.name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={[styles.shiftContainer, { padding: 10, paddingLeft: 20 }]}
          >
            <Text style={styles.shiftText}>Your Next Shift:</Text>
            <Text style={[styles.shiftText, { fontSize: 24 }]}>2 Sept '20</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    justifyContent: "space-between",
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: colors.white,
    position: "absolute",
    left: -70,
    top: -100,
  },
  shiftContainer: {
    backgroundColor: colors.purple,
    //padding: -20,
    //flexDirection: "row",
    //justifyContent: "flex-end",
    width: "50%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  shiftText: {
    fontSize: 16,
    //padding: 10,
    color: colors.white,
    fontWeight: "bold",
  },
  header: {
    fontWeight: "800",
    fontSize: 24,
    color: "#514E5A",
    marginVertical: 5,
  },
  tagline: {
    fontSize: 44,
    fontWeight: "800",
    //marginTop: 12,
    color: colors.purple,
    //paddingVertical: 20,
  },
  input: {
    marginTop: 16,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600",
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dashboard;
