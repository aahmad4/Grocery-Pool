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
    .min(2, "Title must be at least 2 characters long")
    .max(255, "Maximum Length Exceeded")
    .required("Title is required"),
  description: Yup.string()
    .min(2, "Description must be at least 2 characters long")
    .max(255, "Maximum Length Exceeded")
    .required("Description is required"),
  address: Yup.string().required("Address is required"),
});

export default function PostForm(props) {
  const navigation = useNavigation();
  const author = "author"; /* logged in UserID*/
  const post = props.route.params.post;
  const formTitle = props.route.params.formTitle;

  return (
    <Layout navigation={props.navigation}>
      <Surface style={styles.container}>
        <Title style={styles.title}>{formTitle}</Title>
        <Surface style={styles.formContainer}>
          <Formik
            onSubmit={(values) => {
              /**
               * Call Create Post API
               */
              console.log(values);
            }}
            validationSchema={PostCreateSchema}
            initialValues={{
              title: post.title ? post.title : "",
              description: post.description ? post.description : "",
              address: post.address ? post.address : "",
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
                    label="Title"
                    type="text"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
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
                    label="Description"
                    type="text"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
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
                    label="Address"
                    type="text"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
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
