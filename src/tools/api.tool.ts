import { getSession } from "@/lib";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEST_API_URL,
  timeout: 1000 * 10,
  headers: {
    ContentType: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && session.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
