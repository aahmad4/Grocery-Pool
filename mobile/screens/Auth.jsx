import React from "react";
import Layout from "../components/Layout";
import { Colors, Surface, Text, Title, Button } from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import Logo from "../components/Logo";
import { ScreenRoutes } from "../ScreenRoutes";

import Background from "../assets/background-3.jpg";

export default function Auth(props) {
  return (
    <Layout navigation={props.navigation}>
      <ImageBackground
        source={Background}
        style={styles.background}
        imageStyle={{
          opacity: 0.9,
        }}
      >
        <Surface style={styles.logo}>
          <Logo />
        </Surface>
        <View style={styles.container}>
          <Title style={styles.title}>Grocery Pool</Title>
          <Text style={styles.description}>
            We revolutionize your grocery experience
          </Text>
        </View>
      </ImageBackground>
      <Surface style={styles.navigation}>
        <Surface style={styles.buttonContainer}>
          <Button
            icon="email"
            color={Colors.blue900}
            mode="contained"
            style={styles.emailButton}
          >
            Login with Email
          </Button>
        </Surface>
        <Surface style={styles.buttonContainer}>
          <Button
            icon="google"
            color={Colors.blue900}
            mode="contained"
            style={styles.googleButton}
          >
            Login with Google
          </Button>
        </Surface>
        <Surface style={styles.signupLinkContainer}>
          <Text>
            Don't have an account?{"  "}
            <Text
              style={styles.signupLink}
              onPress={() => props.navigation.navigate(ScreenRoutes.Register)}
            >
              Signup
            </Text>
          </Text>
        </Surface>
      </Surface>
    </Layout>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    marginBottom: 30,
  },
  logo: {
    marginTop: "50%",
    marginBottom: "20%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginVertical: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 40,
    padding: 10,
    color: "#FFF",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  navigation: {
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  googleButton: {
    marginBottom: 20,
    paddingVertical: 5,
  },
  emailButton: {
    marginBottom: 20,
    paddingVertical: 5,
  },
  signupLinkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signupLink: {
    textDecorationLine: "underline",
    fontSize: 15,
  },
});
