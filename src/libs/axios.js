import Axios from 'axios';
import config from '../config';
import store from "../store";
import {doLogout} from "../redux/actions/staff";
import {message,} from "antd";

const axios = Axios.create({
});

axios.interceptors.response.use((reponsse) => {
    return reponsse;
}, (error) => {
    if (error.response.status === 401) {
        if (error.response.data.message === "Invalid credentials") {
            store.dispatch(doLogout("Vui lòng đăng nhập để tiếp tục.", message.error));
        }
    }
    return Promise.reject(error);
});

export default axios;