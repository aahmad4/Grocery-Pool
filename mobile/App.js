import "react-native-gesture-handler";
import React, { createContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Screens from "./Screens";
import { useColorScheme } from "react-native";

export const AuthenticationContext = createContext({
  user: {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
});

export default function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <AuthenticationContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          user,
          setUser,
        }}
      >
        <Screens colorScheme={colorScheme} />
      </AuthenticationContext.Provider>
    </PaperProvider>
  );
}
