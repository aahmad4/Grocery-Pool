import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Surface } from "react-native-paper";

export default function Layout(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{props.children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#FFF",
  },
});
