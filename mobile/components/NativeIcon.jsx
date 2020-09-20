import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

function NativeIcon(props) {
  return <MaterialCommunityIcons name={props.name} size={props.size} />;
}

export default NativeIcon;
