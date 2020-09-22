import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import { TextInput } from "react-native-gesture-handler";
import invoicesApi from "../api/invoices";
import Searchbar from "../components/SearchBar";
import ActivityIndicator from "../components/ActivityIndicator";

function InvoicesScreen(props) {
  const getInvoicesApi = useApi(invoicesApi.getInvoices);

  //.data due to data field in response
  let invoices;
  if (!getInvoicesApi.error) {
    invoices = getInvoicesApi.data.data;
  }

  useEffect(() => {
    getInvoicesApi.request();
  }, []);

  // const [invoices, setDrivers] = useState(initialInvoices);
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
          paddingTop: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
          }}
        >
          Invoices
        </Text>
        <Ionicons
          name="ios-add-circle"
          size={36}
          color={colors.purple}
        ></Ionicons>
      </View>
      <View style={{}}>
        {/* <Feather name="search" size={18} /> */}

        <TextInput
          style={{
            marginBottom: 10,
            backgroundColor: "#f7f7f7",
            marginHorizontal: 20,
            height: 30,
            //borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.darkgrey,
            flexDirection: "row",
          }}
          placeholder="Search..."
          keyboardType="web-search"
          onChangeText={() => console.log()}
        />
      </View>

      <ListItemSeperator />
      {!invoices && <ActivityIndicator visible={getInvoicesApi.loading} />}
      <FlatList
        data={invoices}
        keyExtractor={(invoice) => invoice._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.fileName}
            subtitle={`BASIC`}
            image={require("../assets/pdfIcon.png")}
            imageSize={60}
            onPress={() => console.log()}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          getInvoicesApi.request();
          invoices = getInvoicesApi.data.data;
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

export default InvoicesScreen;
