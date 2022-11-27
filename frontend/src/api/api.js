import axios from "axios";
const baseURL = "http://127.0.0.1:8000";

const apiInstance = axios.create({
    baseURL : baseURL,
    withCredentials : true,
})

export const apiPrivateInstance = axios.create({
    baseURL : baseURL,
    withCredentials : true,
    headers : {'Content-Type' : 'application/json'}
})

export default apiInstance;