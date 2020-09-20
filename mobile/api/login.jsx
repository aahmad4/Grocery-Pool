import axios from "axios";

export const loginUser = (username, password) => {
  axios.post("URLHERE", username, password).then((res) => res.json());
};
