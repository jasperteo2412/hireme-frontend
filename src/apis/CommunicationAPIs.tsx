/* eslint-disable no-console */
import axios from "axios";
import { apis } from "./apiConfig";

const APIConfig = apis()!;

export const getMessages = async () => {

    let res;
    let status;
    let resError;

    await axios.get(APIConfig.API.communicationUrl, {
        headers: APIConfig.APIHeaders
    })
    .then((response: any) => {
        res = response.data.data;
        status = response.data.status;
    })
    .catch((error: any) => {
        resError = error.message;
    })

    return { res, status, resError };
};

export const postMessages = async (data: any) => {

    let res;
    let status;
    let resError;

    console.log("TESTING: ", data);
    await axios.post(APIConfig.API.communicationUrl, data, {
        headers: APIConfig.APIHeaders,
    })
    .then((response: any) => {
        console.log("response: ", response);
        res = response.data.data;
        status = response.data.status;
    })
    .catch((error: any) => {
        console.log("error: ", error);
        resError = error.message;
    })

    return { res, status, resError };
};

export const updateMessageIndicator = async (data: any) => {

    let res;
    let status;
    let resError;

    console.log("TESTING: ", data);
    await axios.put(APIConfig.API.communicationUrl, data, {
        headers: APIConfig.APIHeaders,
    })
    .then((response: any) => {
        console.log("response: ", response);
        res = response.data.data;
        status = response.data.status;
    })
    .catch((error: any) => {
        console.log("error: ", error);
        resError = error.message;
    })

    return { res, status, resError };
};

export const checkMessages = async () => {

    let res;
    let status;
    let resError;

    await axios.get(APIConfig.API.communicationCheckUrl, {
        headers: APIConfig.APIHeaders
    })
    .then((response: any) => {
        res = response.data.data;
        status = response.data.status;
    })
    .catch((error: any) => {
        resError = error.message;
    })

    return { res, status, resError };
};