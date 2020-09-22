import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

import Searchbar from "../components/SearchBar";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItem from "../components/ListItem";
import { FlatList } from "react-native-gesture-handler";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

import stationsApi from "../api/stations";
import ActivityIndicator from "./ActivityIndicator";
import useApi from "../../hooks/useApi";

import { useFormikContext } from "formik";

function StationPicker({ onSelectStation, placeholder, selectedStation }) {
  const getStaionsApi = useApi(stationsApi.getStations);

  //.data due to data field in response
  let stations;
  if (!getStaionsApi.error) {
    stations = getStaionsApi.data.data;
  }

  useEffect(() => {
    getStaionsApi.request();
  }, []);

  const [modalVisible, setModalVisibe] = useState(false);

  const {} = useFormikContext;

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => setModalVisibe(true)}
        activeOpacity={0.9}
      >
        <View
          style={{
            backgroundColor: colors.light,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="arrow-down-drop-circle"
            color={colors.purple}
            size={16}
          />
          <Text>
            {selectedStation ? selectedStation.stationId : placeholder}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.screen}>
          {getStaionsApi.error && (
            <>
              <Text>Couldnt load stations</Text>
              <AppButton title="Retry" style={{ borderRadius: 5 }} />
            </>
          )}
          {!getStaionsApi.error && (
            <>
              <Searchbar />
            </>
          )}
          <ActivityIndicator visible={getStaionsApi.loading} />

          <FlatList
            data={stations}
            keyExtractor={(station) => station.stationId.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={"#" + item.stationId}
                subtitle={item.city}
                //image={item.image}
                onPress={() => {
                  setModalVisibe(false);
                  onSelectStation(item);
                }}
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 15,
  },
});

export default StationPicker;
