import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Button,
} from "react-native";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";
import { TouchableHighlight, ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

import StationPicker from "../components/StationPicker";
import { Formik } from "formik";
import FormImagePicker from "../components/forms/FormImagePicker";
import * as Yup from "yup";

import loadsApi from "../api/loads";
import ErrorMessage from "../components/errorMessage";
import ImageInput from "../components/ImageInput";
import ImageInputList from "../components/ImageInputList";
import AppFormField from "../components/forms/AppFormField";
import UploadScreen from "./UploadScreen";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  order: Yup.string().required("Required*"),
  waiting: Yup.number().label("Waiting Time"),
  uptLink: Yup.string().required("Required*"),
  // images: Yup.array().min(1, "Please select at least one image"),
  images: Yup.array(),
});

function DailyReportScreen({ navigation }) {
  const [station, setStation] = useState();
  const [imageUris, setImageUris] = useState([]);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageuri) => imageuri !== uri));
  };

  const handleSubmit = async (load) => {
    console.log(`Initial : ${uploadError}`);
    setUploadError(false);
    setProgress(0);
    setUploadVisible(true);

    load.images = imageUris;
    load.station = station.stationId;
    load.city = station.city;
    const result = await loadsApi.addLoad(load, (progress) =>
      setProgress(progress)
    );
    setUploadError(!result.ok);

    // console.log(`After : ${uploadError} RESULT.OK: ${result.ok}`);

    // if (result.status !== 201) {
    //   setUploadVisible(false);
    //   return alert(result.data.error);
    // }
    // return setUploadVisible(false);
    //return alert(result.data.error);
  };

  return (
    <Screen style={StyleSheet.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
        error={true}
        //success={uploadError}
      />
      <Formik
        initialValues={{
          station: "RANDOM STATION",
          city: "Jalandhar",
          rate: "80",
          terminal: "Toronto",
          order: "",
          waiting: "0",
          comments: "",
          uptLink: "",
          splits: "1",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View
              style={{
                backgroundColor: colors.lightgrey,
                flex: 1,
              }}
            >
              <ScrollView style={{ paddingHorizontal: 30 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={[styles.formTitle]}>Station:</Text>
                  <StationPicker
                    selectedStation={station}
                    onSelectStation={(station) => setStation(station)}
                    placeholder="SELECT"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.formTitle}>City</Text>
                  <Text style={styles.formTitle}>Rate</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 32 }}>
                    {station ? station.city : "--"}
                  </Text>

                  <Text style={{ fontWeight: "bold", fontSize: 32 }}>
                    {" "}
                    {station ? "$" + station.rateToronto : "--"}
                  </Text>
                </View>
                <View>
                  <Text style={styles.formTitle}>Terminal</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Toronto</Text>
                    <Text>Oakville</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Hamilton</Text>
                    <Text>Nanticoke</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.formTitle}>Split Loads</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Ionicons
                        name="md-add-circle"
                        color={colors.purple}
                        size={24}
                        style={{ paddingHorizontal: 20 }}
                      />
                      <Ionicons
                        name="md-add-circle"
                        size={24}
                        color={colors.purple}
                      />
                    </View>
                    <View>
                      <Text style={styles.formTitle}>1</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.formTitle}>Date</Text>
                  <TouchableHighlight
                    onPress={() => console.log("")}
                    activeOpacity={0.9}
                  >
                    <View
                      style={{
                        backgroundColor: colors.light,
                        paddingHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="calendar"
                        size={24}
                        color={colors.purple}
                      />
                      <Text>21-Aug-2020</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <AppFormField
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder="1234"
                      title="Order Number"
                      name="order"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <AppFormField
                      title="Waiting Time"
                      name="waiting"
                      placeholder="Past 1 hr"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <AppFormField
                  autoCorrect={false}
                  title="Comments"
                  name="comments"
                  placeholder="If any"
                  multiline={true}
                  numberOfLines={3}
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  title="Upt Link"
                  name="uptLink"
                  placeholder="Copy and paste the UPT link"
                />

                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={styles.formTitle}>Paperwork</Text>
                    </View>
                  </View>
                  {/* <FormImagePicker name="images" /> */}
                  <ImageInputList
                    imageUris={imageUris}
                    onAddImage={handleAdd}
                    onRemoveImage={handleRemove}
                  />
                </View>
              </ScrollView>
              <ListItemSeperator />
              <ListItemSeperator />
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: colors.white,
                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <AppButton
                    title="Cancel"
                    color="#b8b6ba"
                    fontColor="lightgrey"
                    style={{ borderRadius: 5, flex: 1, marginRight: 10 }}
                    onPress={() => navigation.pop(1)}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <AppButton
                    title="Submit"
                    onPress={handleSubmit}
                    style={{ borderRadius: 5, flex: 1, marginLeft: 10 }}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  formTitle: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "400",
    color: colors.darkgrey,
  },
  input: {
    //marginTop: 10,
    height: 45,
    borderWidth: StyleSheet.hairlineWidth * 4,
    borderStyle: "solid",
    borderColor: colors.light,
    backgroundColor: colors.white,
    borderRadius: 10,
    //paddingHorizontal: 16,
    paddingHorizontal: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default DailyReportScreen;
