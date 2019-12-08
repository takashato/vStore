import axios from "../../libs/axios";
import {message} from "antd";

export const TOKEN_UPDATED = 'TOKEN_UPDATED';
export const LOGOUT = 'LOGOUT';

export function setToken(token) {
    console.log('Token updated');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return {
        type: TOKEN_UPDATED,
        token: token,
    }
}

export function doLogout() {
    return (dispatch, getState) => {
        message.destroy();
        // Remove token stored in session / local storage
        sessionStorage.removeItem('session_token');
        localStorage.removeItem('session_token');
        dispatch({
            type: LOGOUT,
        });
        message.success('Đăng xuất thành công!');
    };

}