import React from "react";
import { useFormikContext } from "formik";
import { Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ErrorMessage from "../errorMessage";
import colors from "../../config/colors";

function AppFormField({ title, name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <Text style={styles.formTitle}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
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

export default AppFormField;
