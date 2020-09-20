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

const CommentCreateSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});

export default function CommentForm(props) {
  const navigation = useNavigation();
  const author = "author"; /* logged in UserID*/
  const comment = props.route.params.comment;
  const formTitle = props.route.params.formTitle;

  return (
    <Layout navigation={props.navigation}>
      <Surface style={styles.container}>
        <Title style={styles.title}>{formTitle}</Title>
        <Surface style={styles.formContainer}>
          <Formik
            onSubmit={(values) => {
              /**
               * Call Create Comment API
               */
              console.log(values);
            }}
            validationSchema={CommentCreateSchema}
            initialValues={{
              description: comment.description ? comment.description : "",
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
                    label="description"
                    type="text"
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    name="description"
                  />
                  {errors.description && touched.description ? (
                    <Text style={styles.error}>{errors.description}</Text>
                  ) : null}
                </View>
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  color={Colors.blue900}
                  style={styles.button}
                >
                  Create Comment
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
