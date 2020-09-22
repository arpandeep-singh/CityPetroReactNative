import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { View, StyleSheet, Modal } from "react-native";
import Screen from "../components/Screen";
import Searchbar from "../components/SearchBar";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItem from "../components/ListItem";

import stationsApi from "../api/stations";

// const initialStations = [
//   {
//     stationId: 52873,
//     city: "Brampton",
//     rateToronto: 85,
//   },
//   {
//     stationId: 88265,
//     city: "Toronto",
//     rateToronto: 85,
//   },
//   {
//     stationId: 26173,
//     city: "Missisauga",
//     rateToronto: 85,
//   },
// ];

function StationIdListScreen({ visible, onPress, onSelectItem }) {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    const response = await stationsApi.getStations();
    setStations(response.data);
  };
  // const [stations, setStations] = useState(initialStations);
  // const [refreshing, setRefreshing] = useState(false);
  return (
    <Modal visible={visible} animationType="slide">
      <Screen>
        <Searchbar />
        <FlatList
          data={stations}
          keyExtractor={(station) => station.stationId.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={"#" + item.stationId}
              subtitle={item.city}
              //image={item.image}
              onPress={onPress}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          // refreshing={refreshing}
          // onRefresh={() => {
          //   setStations([
          //     {
          //       stationId: 88265,
          //       city: "Toronto",
          //       rateToronto: 85,
          //     },
          //     {
          //       stationId: 26173,
          //       city: "Missisauga",
          //       rateToronto: 85,
          //     },
          //   ]);
          // }}
        />
      </Screen>
    </Modal>
  );
}

export default StationIdListScreen;
