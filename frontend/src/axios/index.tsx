import axios from "axios";
import { Resources } from "../services/Resources";

// Create axios instance
const instance = axios.create({
  baseURL: Resources.BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
