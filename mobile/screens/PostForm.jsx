import React from "react";
import { Formik } from "formik";
import Layout from "../components/Layout";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import {
  Colors,
  Surface,
  Text,
  Title,
  TextInput,
  Button,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";

const PostCreateSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Minimum length is 5")
    .max(255, "Maximum Length Exceeded"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Minimum length is 5")
    .max(255, "Maximum Length Exceeded"),
  address: Yup.string().required("Address is required"),
});

export default function PostForm(props) {
  const navigation = useNavigation();
  const author = "author"; /* logged in UserID*/
  const post = props.route.params.post;

  return (
    <Layout navigation={props.navigation}>
      <Surface style={styles.container}>
        <Title style={styles.title}>Create an account</Title>
        <Surface style={styles.formContainer}>
          <Formik
            onSubmit={(values) => {
              /**
               * Call Create Post API
               */
              console.log(values);
            }}
            validationSchema={PostCreateSchema}
            initialValues={post}
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
                    label="title"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    name="title"
                  />
                  {errors.title && touched.title ? (
                    <Text style={styles.error}>{errors.title}</Text>
                  ) : null}
                </View>
                <View style={styles.form}>
                  <TextInput
                    mode="outlined"
                    label="description"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                  />
                  {errors.description && touched.description ? (
                    <Text style={styles.error}>{errors.description}</Text>
                  ) : null}
                </View>
                <View style={styles.form}>
                  <TextInput
                    mode="outlined"
                    label="address"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    name="address"
                  />
                  {errors.address && touched.address ? (
                    <Text style={styles.error}>{errors.address}</Text>
                  ) : null}
                </View>
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  color={Colors.blue900}
                  style={styles.button}
                >
                  Create Post
                </Button>
                <Button
                  onPress={() => navigation.goBack()}
                  mode="contained"
                  color={Colors.blue900}
                  style={styles.button}
                >
                  Cancel
                </Button>
              </View>
            )}
          </Formik>
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
