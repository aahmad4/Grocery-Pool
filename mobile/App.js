import "react-native-gesture-handler";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Screens from "./Screens";
import { useColorScheme } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <Screens colorScheme={colorScheme} />
    </PaperProvider>
  );
}
