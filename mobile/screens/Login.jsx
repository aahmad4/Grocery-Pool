import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import {
  Colors,
  Surface,
  Text,
  Title,
  TextInput,
  Button,
  Banner,
} from "react-native-paper";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Formik } from "formik";
import { ScreenRoutes } from "../ScreenRoutes";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { loginUser } from "../api/login";
import { AuthenticationContext } from "../App";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum password length is 3")
    .max(255, "Maximum password length is 255")
    .required("Password is required"),
});

export default function Login(props) {
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <Layout navigation={props.navigation}>
      <Banner
        visible={visible}
        actions={[
          {
            label: "Close",
            onPress: () => setVisible(false),
          },
        ]}
        icon="exclamation"
        style={styles.banner}
      >
        <Text>Authentication Failed. Wrong Email or Password</Text>
      </Banner>
      <Surface style={styles.container}>
        <Title style={styles.title}>Welcome back!</Title>
        <Text style={styles.description}>
          Enter your credentials to continue
        </Text>
        <Surface style={styles.formContainer}>
          <Formik
            onSubmit={async (user) => {
              let status = await loginUser(user);
              if (status !== null) {
                /* Navigate to Feed -> User as parameter*/
                console.log(status);
                await AsyncStorage.setItem("@user", JSON.stringify(user));
                console.log("Login Success");
                navigation.goBack();
                // navigation.navigate(ScreenRoutes.Auth, { user });
                setIsAuthenticated(true);
              } else {
                setVisible(true);
              }
            }}
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={styles.form}>
                  <TextInput
                    mode="outlined"
                    label="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : null}
                </View>
                <View style={styles.form}>
                  <TextInput
                    mode="outlined"
                    label="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}
                </View>
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  color={Colors.blue900}
                  style={styles.button}
                >
                  Sign in
                </Button>
              </View>
            )}
          </Formik>
        </Surface>
        <Surface style={styles.authLinkContainer}>
          <Text>
            Don't have an account?{"  "}
            <Text
              style={styles.authLink}
              onPress={() => navigation.navigate(ScreenRoutes.Auth)}
            >
              Register
            </Text>
          </Text>
        </Surface>
      </Surface>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
  },
  description: {
    fontSize: 16,
  },
  formContainer: {
    marginTop: 60,
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  authLinkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authLink: {
    textDecorationLine: "underline",
    fontSize: 15,
  },
  error: {
    marginTop: 3,
    marginLeft: 8,
    color: "red",
  },
});
