import React, { useState } from "react";
import Screen from "../components/Screen";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../components/errorMessage";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const auth = useAuth();

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    setLoginFailed(!result.ok);
    if (!result.ok) return setLoginError(result.data.error);
    auth.logIn(result.data.token);
  };
  return (
    <Screen style={styles.screen}>
      <View>
        <View style={styles.circle} />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.tagline}>City Petro</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <View style={{ marginHorizontal: 32, marginTop: 32 }}>
                <Text style={styles.header}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  onChangeText={handleChange("email")}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onBlur={() => setFieldTouched("email")}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />
                <Text style={styles.header}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  textContentType="password"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                />
                <ErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                <View style={{ alignItems: "flex-end", marginTop: 40 }}>
                  <TouchableOpacity
                    style={styles.continue}
                    activeOpacity={0.9}
                    onPress={handleSubmit}
                  >
                    <Ionicons
                      name="md-arrow-round-forward"
                      size={24}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
                <ErrorMessage error={loginError} visible={loginFailed} />
              </View>
            </>
          )}
        </Formik>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: colors.primary,
            fontWeight: "bold",
            paddingVertical: 20,
          }}
        >
          Forgot Password?
        </Text>
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
    width: 560,
    height: 560,
    borderRadius: 560 / 2,
    backgroundColor: colors.white,
    position: "absolute",
    left: -100,
    top: -100,
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
    marginTop: 12,
    color: colors.purple,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 10,
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

export default LoginScreen;
