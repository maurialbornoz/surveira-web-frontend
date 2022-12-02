const ENDPOINT_URL = "http://localhost:8080";
export const REGISTER_ENDPOINT = ENDPOINT_URL + "/users";
export const LOGIN_ENDPOINT = ENDPOINT_URL + "/users/login";
export const CREATE_POLL_ENDPOINT = ENDPOINT_URL + "/polls";
export const GET_POLL_WITH_QUESTIONS_ENDPOINT = (uuid: string) => `${ENDPOINT_URL}/polls/${uuid}/questions`;
export const CREATE_POLL_REPLY_ENDPOINT = ENDPOINT_URL + "/polls/reply"