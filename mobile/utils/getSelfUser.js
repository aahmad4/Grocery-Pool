import { AsyncStorage } from "react-native";

export const getSelfUser = async () => {
  try {
    const authenticatedUser = await AsyncStorage.getItem("@user");
    if (authenticatedUser !== null) {
      return JSON.parse(authenticatedUser);
    }
  } catch (err) {
    return null;
  }
};
