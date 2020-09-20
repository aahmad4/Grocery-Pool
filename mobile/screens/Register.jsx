import React from "react";
import Layout from "../components/Layout";
import {
  Colors,
  Surface,
  Text,
  Title,
  TextInput,
  Button,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { ScreenRoutes } from "../ScreenRoutes";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(3, "Minimum password length is 3")
    .max(255, "Maximum password length is 255")
    .required("Password is required"),
});

export default function Register(props) {
  const navigation = useNavigation();

  return (
    <Layout navigation={props.navigation}>
      <Surface style={styles.container}>
        <Title style={styles.title}>Create an account</Title>
        <Text style={styles.description}>
          Join the grocery revolution with us.
        </Text>
        <Surface style={styles.formContainer}>
          <Formik
            onSubmit={(values) => {
              /**
               * Send Signup/register Axios Request here to API
               */
              console.log(values);
            }}
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              name: "",
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
                    label="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <Text style={styles.error}>{errors.name}</Text>
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
                  Sign up
                </Button>
              </View>
            )}
          </Formik>
        </Surface>
        <Surface style={styles.authLinkContainer}>
          <Text>
            Already have an account?{"  "}
            <Text
              style={styles.authLink}
              onPress={() => navigation.navigate(ScreenRoutes.Auth)}
            >
              Login
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
