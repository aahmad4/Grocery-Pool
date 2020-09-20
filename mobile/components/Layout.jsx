import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { checkAuthStatus } from "../utils/checkAuthStatus";
import Header from "./Header";

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
          {isAuthenticated ? (
            <View style={styles.headerContainer}>
              <Header />
            </View>
          ) : null}
          <View>{props.children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 16,
  },
  authContainer: {},
  mainContainer: {
    marginTop: 24,
  },
  scrollView: {
    backgroundColor: "#FFF",
  },
});
