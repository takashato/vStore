import axios from "../../libs/axios";

export const TOKEN_UPDATED = 'TOKEN_UPDATED';

export function setToken(token) {
    console.log('Token updated');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return {
        type: 'TOKEN_UPDATED',
        token: token,
    }
}