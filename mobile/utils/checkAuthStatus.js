import { AsyncStorage } from "react-native";

export const checkAuthStatus = async (setIsAuthenticated) => {
  /**
   * Temporary setting up the user in async storage, DONT DO THIS EVER
   */
  await AsyncStorage.setItem(
    "@user",
    JSON.stringify({
      _id: "1",
      email: "adam@smith.com",
      name: "Adam Smith",
      address: "Coney Island, NY",
    })
  );

  try {
    const user = await AsyncStorage.getItem("@user");
    if (user !== null) {
      setIsAuthenticated(true);
    }
  } catch (err) {
    setIsAuthenticated(false);
  }
};
