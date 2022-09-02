import axios from "axios";
import { BASED_URL } from "../fetch/BasedUrl";

const instance = axios.create({
    baseURL: BASED_URL,
    timeout: 2000
});

export const sendRequest = (config) => {
    return instance.request(config);
}

export const getRequest = (path) => {
    return sendRequest({
        method: 'GET',
        url: path
    })
}

export const postRequest = (path, data) => {
    return sendRequest({
        method: 'POST',
        url: path,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    })
}

export const deleteRequest = (path, id) => {
    return sendRequest({
        method: 'DELETE',
        url: path + id
    })
}

export const putRequest = (path, data) => {
    console.log(data);
    return sendRequest({
        method: 'PUT',
        url: path + data.id,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    })
}