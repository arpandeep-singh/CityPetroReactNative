import React from "react";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { StyleSheet, View, FlatList } from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeperator from "../components/ListItemSeperator";

import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Schedule",
    icon: {
      name: "calendar",
      backgroundColor: colors.purple,
    },
    targetScreen: "Schedule",
  },
  {
    title: "My Earnings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.purple,
    },
    targetScreen: "Earnings",
  },
  {
    title: "My Invoices",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.purple,
    },
    targetScreen: "Invoices",
  },
  {
    title: "Notifications",
    icon: {
      name: "email",
      backgroundColor: colors.purple,
    },
    targetScreen: "Notifications",
  },
];

function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subtitle={user.email}
          onPress={() => console.log("")}
          image={require("../assets/profilepic.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.targetScreen)}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        onPress={() => logout()}
        IconComponent={<Icon name="logout" backgroundColor={colors.purple} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
