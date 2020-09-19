import React, { useState } from "react";
import {
  Colors,
  Surface,
  Text,
  Title,
  Button,
  Modal,
  Provider,
  Portal,
} from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { ScreenRoutes } from "../ScreenRoutes";
import Background from "../assets/background-3.jpg";
import { googleAuth } from "../api/googleAuth";

export default function Auth(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout navigation={props.navigation}>
      <ImageBackground
        source={Background}
        style={styles.background}
        imageStyle={{
          opacity: 0.9,
        }}
        progressiveRenderingEnabled={true}
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
            onPress={() => props.navigation.navigate(ScreenRoutes.Login)}
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
            loading={isLoading}
            onPress={() => {
              setIsLoading(true);
              googleAuth().then(() => {
                setIsLoading(false);
              });
            }}
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
