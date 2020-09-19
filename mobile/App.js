import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./Screens";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        {/* <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View> */}
        <Screens />
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
