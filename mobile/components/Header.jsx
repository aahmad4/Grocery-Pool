import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import source from "../assets/grocery_pool_logo.png";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={source} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Grocery Pool</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    // marginLeft: 16,
    marginRight: 5,
  },
  logoImage: {
    backgroundColor: "transparent",
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 3,
  },
});
