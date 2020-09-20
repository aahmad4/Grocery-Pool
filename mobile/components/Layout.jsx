import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { checkAuthStatus } from "../utils/checkAuthStatus";

export default function Layout(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus(setIsAuthenticated);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={isAuthenticated ? styles.mainContainer : styles.authContainer}
        >
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authContainer: {},
  mainContainer: {
    marginTop: 30,
  },
  scrollView: {
    backgroundColor: "#FFF",
  },
});
