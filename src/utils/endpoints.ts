import { USER_POLLS_PER_PAGE } from "./constants";

// const ENDPOINT_URL = "https://surveira-web-backend-production.up.railway.app";
const ENDPOINT_URL = "https://surveira-backend.onrender.com";

// const ENDPOINT_URL = "http://localhost:8080";

export const REGISTER_ENDPOINT = ENDPOINT_URL + "/users";
export const LOGIN_ENDPOINT = ENDPOINT_URL + "/users/login";
export const CREATE_POLL_ENDPOINT = ENDPOINT_URL + "/polls";
export const GET_POLL_WITH_QUESTIONS_ENDPOINT = (uuid: string) => `${ENDPOINT_URL}/polls/${uuid}/questions`;
export const CREATE_POLL_REPLY_ENDPOINT = ENDPOINT_URL + "/polls/reply"
export const GET_USER_POLLS_ENDPOINT = (page: number) => `${ENDPOINT_URL}/polls?page=${page}&limit=${USER_POLLS_PER_PAGE}`
export const TOGGLE_POLL_OPENED_ENDPOINT = (uuid: string) => `${ENDPOINT_URL}/polls/${uuid}`;
export const DELETE_POLL_ENDPOINT = (uuid: string) => `${ENDPOINT_URL}/polls/${uuid}`;
export const GET_POLL_RESULTS_ENDPOINT = (uuid: string) => `${ENDPOINT_URL}/polls/${uuid}/results`;