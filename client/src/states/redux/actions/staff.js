import axios from "../../../libs/axios";
import {message} from "antd";

export const TOKEN_UPDATED = 'TOKEN_UPDATED';
export const LOGOUT = 'LOGOUT';

export function setToken(token) {
    return async (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        try {
            const res = await axios.get('/staff/self');
            dispatch({
                type: TOKEN_UPDATED,
                token: token,
                staff: res.data,
            });
        } catch (err) {
        }
    };
}

export function doLogout(msg = 'Đăng xuất thành công.', type = message.success) {
    return (dispatch, getState) => {
        message.destroy();
        // Remove token stored in session / local storage
        sessionStorage.removeItem('session_token');
        localStorage.removeItem('session_token');
        dispatch({
            type: LOGOUT,
        });
        type(msg);
    };

}
