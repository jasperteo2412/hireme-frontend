/* eslint-disable no-console */
import axios from "axios";
import { apis } from "./apiConfig";

const APIConfig = apis()!;

export const postSignIn = async (data: any) => {

    let res;
    let status;
    let resError;

    await axios.post(APIConfig.API.userSignInUrl, data, {
        headers: APIConfig.APIHeaders,
    })
    .then((response: any) => {
        console.log("response: ", response);
        res = response.data;
        status = response.status;
    })
    .catch((error: any) => {
        console.log("error: ", error);
        res = error.response.data.message;
        resError = error.message;
    })

    return { res, status, resError };
};

export const postSignUp = async (data: any) => {

    let res;
    let status;
    let resError;

    await axios.post(APIConfig.API.userSignUpUrl, data, {
        headers: APIConfig.APIHeaders,
    })
    .then((response: any) => {
        console.log("response: ", response);
        res = response.data;
        status = response.status;
    })
    .catch((error: any) => {
        console.log("error: ", error);
        res = error.response.data.message;
        resError = error.message;
    })

    return { res, status, resError };
};

export const getSearchUsers = async (searchUser: string) => {

    let res;
    let status;
    let resError;

    await axios.get(APIConfig.API.userSearchUrl, {
        params: {
            search: searchUser
        },
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