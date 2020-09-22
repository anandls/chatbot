import Axios from "axios";
import "dotenv/config";
import { API_BASE } from "../config";

const AxiosInstance = Axios.create({
  //baseURL: process.env.API_BASE_URL, // localhost:9000
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    //"x-auth-token": token,
    //Authorization: token ? `Bearer ${token}` : "",
  },
});

//const bearertoken = localStorage.getItem("persist:user");

AxiosInstance.interceptors.response.use(
  (response) =>
    //(response.headers.Authorization = token ? `Bearer ${token}` : "")
    (response = response ? response : null)
);

export default AxiosInstance;
