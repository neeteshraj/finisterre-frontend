import axios from "axios";
import {api} from "../config/urlConfig";

const axiosInstance = axios.create({
    baseURL: api
    // headers: {
    //     'Authorization':''
    // }
});

export default axiosInstance;