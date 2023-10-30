/* eslint-disable no-console */

const envValue: any = process.env.NODE_ENV;

export const apis = () => {

    const loggedUser = sessionStorage.getItem("USER-ID");

    console.log("envValue: ", envValue);

    if(envValue === 'DEVELOPMENT'){

        const BASE_URL = "http://localhost:"

        const assignmentPaymentRecommendation = "8081"
        const userCommunication = "8083"

        // ASSIGNMENT
        const ASSIGNMENT_URL = "/assignments";

        // COMMUNICATION
        const COMMUNICATION_URL = "/v1/messages";
        const COMMUNICATION_CHECK_URL = "/v1/messages/check";

        // PAYMENTS
        const PAYMENTS_URL = "/api/payments";

        // RECOMMENDATIONS
        const RECOMMENDATIONS_URL = "/recommendations"+ASSIGNMENT_URL;

        //USER
        const USER_SIGN_IN_URL = "/api/auth/signin";
        const USER_SIGN_UP_URL = "/api/auth/signup";
        const USER_SEARCH_URL = "/v1/users/list";
        const USER_REVIEW_URL = "/review";


        const API = {
            assignmentUrl: BASE_URL+assignmentPaymentRecommendation+ASSIGNMENT_URL,
            communicationUrl: BASE_URL+userCommunication+COMMUNICATION_URL,
            communicationCheckUrl: BASE_URL+userCommunication+COMMUNICATION_CHECK_URL,
            paymentsUrl: BASE_URL+assignmentPaymentRecommendation+PAYMENTS_URL,
            recommendationsUrl: BASE_URL+assignmentPaymentRecommendation+RECOMMENDATIONS_URL,
            userSignInUrl: BASE_URL+userCommunication+USER_SIGN_IN_URL,
            userSignUpUrl: BASE_URL+userCommunication+USER_SIGN_UP_URL,
            userSearchUrl: BASE_URL+userCommunication+USER_SEARCH_URL,
            userReviewUrl: BASE_URL+userCommunication+USER_REVIEW_URL,
            

        }
        
        const APIHeaders = {
            'USER-ID': loggedUser
        }

        return { API, APIHeaders };
    }
    else if(envValue === 'PRODUCTION'){

        // CHANGE TO AWS LINK
        const userCommunication_URL = "http://user-communication-spring.ap-southeast-1.elasticbeanstalk.com"
        const assignmentPaymentRecommendation_URL = "http://payment-recommendation-assignment.ap-southeast-1.elasticbeanstalk.com"

        // ASSIGNMENT
        const ASSIGNMENT_URL = "/assignments";

        // COMMUNICATION
        const COMMUNICATION_URL = "/v1/messages";
        const COMMUNICATION_CHECK_URL = "/v1/messages/check";

        // PAYMENTS
        const PAYMENTS_URL = "/api/payments";

        // RECOMMENDATIONS
        const RECOMMENDATIONS_URL = "/recommendations"+ASSIGNMENT_URL;

        //USER
        const USER_SIGN_IN_URL = "/api/auth/signin";
        const USER_SIGN_UP_URL = "/api/auth/signup";
        const USER_SEARCH_URL = "/v1/users/list";
        const USER_REVIEW_URL = "/review";

        // For testing messaging
        const APIHeaders = {
            'USER-ID': loggedUser
        }

        const API = {
            assignmentUrl: assignmentPaymentRecommendation_URL+ASSIGNMENT_URL,
            communicationUrl: userCommunication_URL+COMMUNICATION_URL,
            communicationCheckUrl: userCommunication_URL+COMMUNICATION_CHECK_URL,
            paymentsUrl: assignmentPaymentRecommendation_URL+PAYMENTS_URL,
            recommendationsUrl: assignmentPaymentRecommendation_URL+RECOMMENDATIONS_URL,
            userSignInUrl: userCommunication_URL+USER_SIGN_IN_URL,
            userSignUpUrl: userCommunication_URL+USER_SIGN_UP_URL,
            userSearchUrl: userCommunication_URL+USER_SEARCH_URL,
            userReviewUrl: userCommunication_URL+USER_REVIEW_URL,
        }

        return { API, APIHeaders };
    }
}