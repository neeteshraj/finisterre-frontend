import axios from "axios";
import {api} from "../config/urlConfig";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: api,
    timeout: 3000,
    timeoutErrorMessage: "Request timed out",
    headers: {
        'Authorization':token ? `Bearer ${token}` : ''
    }
});

export default axiosInstance;