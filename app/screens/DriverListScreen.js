import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialDrivers = [
  {
    driverId: 1,
    title: "Arpandeep Singh",
    subtitle: "Advanced",
    image: require("../assets/profilepic.jpg"),
  },
  {
    driverId: 2,
    title: "Lovepreet Singh",
    subtitle: "Basic",
    image: require("../assets/profilepic.jpg"),
  },
  {
    driverId: 3,
    title: "Sneh Amrit ",
    subtitle: "Intermediate",
    image: require("../assets/profilepic.jpg"),
  },
];

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

function DriverListScreen(props) {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (driver) => {
    setDrivers(drivers.filter((d) => d.driverId !== driver.driverId));
  };
  return (
    <Screen style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
          }}
        >
          Drivers
        </Text>
        <Ionicons
          name="ios-add-circle"
          size={36}
          color={colors.purple}
        ></Ionicons>
      </View>
      <ListItemSeperator />
      <FlatList
        data={drivers}
        keyExtractor={(driver) => driver.driverId.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={() => console.log()}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          setDrivers([
            {
              driverId: 1,
              title: "Arpandeep Singh",
              subtitle: "Advanced",
              image: require("../assets/profilepic.jpg"),
            },
            {
              driverId: 2,
              title: "Lovepreet Singh",
              subtitle: "Basic",
              image: require("../assets/profilepic.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
});

export default DriverListScreen;
