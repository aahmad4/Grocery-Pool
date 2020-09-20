import { AsyncStorage } from "react-native";

export const checkAuthStatus = async (setIsAuthenticated) => {
  await AsyncStorage.setItem("@user", {});

  try {
    const user = await AsyncStorage.getItem("@user");
    if (user !== null) {
      setIsAuthenticated(true);
    }
  } catch (err) {
    setIsAuthenticated(false);
  }
};
