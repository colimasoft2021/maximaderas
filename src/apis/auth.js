import { baseURL, headers } from "./config";
import axios from "axios";

// LOGIN API
export function loginAPI (data) {
    const URL = `${baseURL}/login-user`;
    return axios.post(URL, {data}, headers)
    .then((response) => {
        // console.log(response)
        return response
    })
    .then((result) => {
        // console.log(result)
        return result
    });
}


// REGISTER API
export function registerAPI (data) {
    console.log(data)
    return true;
    const URL = `${baseURL}/save-user`;
    return axios.post(URL, {data}, headers)
    .then((response) => {
        // console.log(response)
        return response
    })
    .then((result) => {
        // console.log(result)
        return result
    });
}