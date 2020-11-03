import Axios from "axios";

import config from '../config.json';

export const axiosClient = Axios.create({
    baseURL: config.apiBaseURL,
});
