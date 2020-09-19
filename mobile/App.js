import "react-native-gesture-handler";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Screens from "./Screens";

export default function App() {
  return (
    <PaperProvider>
      <Screens />
    </PaperProvider>
  );
}
