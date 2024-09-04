import axios from "axios";
import { useAuthStore } from "../store/auth.ts";
const authApi = axios.create({
  baseURL: "http://localhost:4000",
  //   withCredentials: true,
});
authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = `application/json, text/plain, */*`;
  return config;
});
export default authApi;
