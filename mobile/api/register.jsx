import axios from "../axios";

export const registerUser = async ({ email, name, password }) => {
  try {
    const response = await axios.post(`/register`, {
      email,
      username: name,
      password,
    });

    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
  }
};
