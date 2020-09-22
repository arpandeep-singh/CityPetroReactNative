import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Platform,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeperator from "../components/ListItemSeperator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useApi from "../../hooks/useApi";
import loadsApi from "../api/loads";
import ActivityIndicator from "../components/ActivityIndicator";

function ReportsScreen(props) {
  const getLoadsApi = useApi(loadsApi.getLoads);

  //.data due to data field in response
  let loads = [];
  if (!getLoadsApi.error) {
    loads = getLoadsApi.data.data;
  }

  useEffect(() => {
    getLoadsApi.request();
  }, []);

  // const [loads, setLoads] = useState(initialLoads);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Screen style={styles.screen}>
      <View style={[styles.container, { marginHorizontal: 15 }]}>
        <View style={styles.innerContainer}>
          <Text
            style={{ fontWeight: "500", color: colors.light, fontSize: 12 }}
          >
            TOTAL EARNINGS
          </Text>
          <Text style={styles.earnings}>$ {}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={"grey"}
            onPress={() => console.log()}
            style={{ borderRadius: 40 }}
          >
            <View style={styles.date}>
              <Text>15-Aug-2020</Text>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                style={{ paddingLeft: 5 }}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={"grey"}
            onPress={() => console.log()}
            style={{ borderRadius: 40 }}
          >
            <View style={styles.date}>
              <Text>30-Aug-2020</Text>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                style={{ paddingLeft: 5 }}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.bannerText}>LOAD HISTORY</Text>
        <ListItemSeperator />
        {!loads && <ActivityIndicator visible={getLoadsApi.loading} />}

        <View style={{ flex: 1 }}>
          <FlatList
            data={loads}
            keyExtractor={(item) => item._id.toString()}
            ItemSeparatorComponent={ListItemSeperator}
            renderItem={({ item }) => (
              <ListItem
                title={item.city}
                subtitle={item.date}
                trailingText={"$" + item.totalRate}
                onPress={() => console.log("")}
              />
            )}
            refreshing={refreshing}
            onRefresh={() => {
              getLoadsApi.request();
              loads = getLoadsApi.data.data;
            }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    // marginVertical: 20,
    // flex: 0.5,
    height: "20%",
    backgroundColor: colors.purple,
    justifyContent: "space-around",
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    // borderBottomLeftRadius: 40,
    // borderTopRightRadius: 40,
  },
  bannerText: {
    paddingLeft: 20,
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    //paddingTop: 30,
  },
  earnings: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.light,
  },
  date: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    flexDirection: "row",
  },
});

export default ReportsScreen;
