import axios from "axios";

export const localAxiosInstance = axios.create({
  baseURL: process.env.NEXT_API_URL || "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    ContentType: "application/json",
  },
});

export default localAxiosInstance;