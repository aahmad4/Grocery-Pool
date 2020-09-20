import * as Google from "expo-google-app-auth";
import { GOOGLE_CLIENT_ANDROID_ID, GOOGLE_CLIENT_IOS_ID } from "../env";
import axios from "axios";

const googleConfig = {
  iosClientId: GOOGLE_CLIENT_IOS_ID,
  androidClientId: GOOGLE_CLIENT_ANDROID_ID,
  iosStandaloneAppClientId: GOOGLE_CLIENT_IOS_ID,
  androidStandaloneAppClientId: GOOGLE_CLIENT_IOS_ID,
};

export const googleAuth = async () => {
  console.log("test");
  const response = await Google.logInAsync(googleConfig);
  console.log(response);
  /**
   * Send user's data from google to backend using Axios.
   */

  // axios({
  //   url: ""
  // });
};
