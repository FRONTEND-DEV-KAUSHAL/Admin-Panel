import axios from "axios";
import { BASE_URL } from "../Base_url/url";


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

export const sendRequest = (config) => {
    return instance.request(config)
}

export const getRequest = (path) => {
    return sendRequest({
        method: 'GET',
        url: path,
    })
}
export const postRequest = (path,data) => {
    return sendRequest({
        method: 'POST',
        url: path,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}