import React from "react";
import { View, Image, StyleSheet } from "react-native";
import source from "../assets/grocery_pool_logo.png";

export default function Logo(props) {
  return (
    <View style={classes.logoContainer}>
      <Image source={source} style={classes.logoImage} />
    </View>
  );
}

const classes = StyleSheet.create({
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  logoImage: {
    position: "absolute",
    backgroundColor: "transparent",
    width: 150,
    height: 150,
  },
});
