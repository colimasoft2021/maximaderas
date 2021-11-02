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


// RECUPERACION-CONTRASEÑA API
export function recuperacionClaveAPI(data){
    const URL = `${baseURL}/recuperacion-clave`;
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

//ACTUALIZAR CONTRASEÑA API
export function claveNuevaAPI(data){
    const URL = `${baseURL}/clave-nueva`;
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