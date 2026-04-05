import axios from "axios";

const API_BASE = "https://api.anywheretrips.in/v1";
const API_KEY = "urWQuAoOFwN2FeQGyXZys5eZzSOWYA9G";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export const signupUser = async (username: string, password: string) => {
  const response = await axiosInstance.post("/users", { username, password });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post("/users/login", {
    username,
    password,
  });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axiosInstance.get("/users/me/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
