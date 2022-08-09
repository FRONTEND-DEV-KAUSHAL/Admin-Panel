import { getRequest, postRequest } from "../Request"

export const getMedicinesData = () => {
    return getRequest('medicines')
}

export const postMedicinesData = () => {
    return postRequest('medicines')
}