import axios from "../axios";

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`/login`, {
      username,
      password,
    });

    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
  }
};
