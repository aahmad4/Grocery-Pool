import axios from "axios";
import { BACKEND_URL } from "./env";

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export default instance;
