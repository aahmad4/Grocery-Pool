import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

function NativeIcon(props) {
  return <Icon name={props.name} size={props.size} />;
}

export default NativeIcon;
