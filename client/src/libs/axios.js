import Axios from 'axios';
import config from '../config';

const axios = Axios.create({
    baseURL: config.baseURL,
});

axios.interceptors.response.use((reponsse) => {
    return reponsse;
}, (error) => {
    return Promise.reject(error);
});

export default axios;
