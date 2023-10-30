import axios from "axios";
import { apis } from "./apiConfig";

const APIConfig = apis();

export const getAssignments = async () => {

    let res;
    let status;
    let resError;

    await axios.get(APIConfig!.API.assignmentUrl, {
        headers: APIConfig!.APIHeaders
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
