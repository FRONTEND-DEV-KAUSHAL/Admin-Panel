import { deleteRequest, getRequest, postRequest, putRequest } from "../request"


export const getAllDoctorsData = () => {
    return getRequest('doctors')
}

export const addAllDoctorsdata = (data) => {
    return postRequest('doctors' , data)
}

export const deleteAllDotorsData = (id) => {
    return deleteRequest('doctors/' , id)
}

export const updateAllDoctorsdata = (data) => {
    return putRequest('doctors/' , data)
}