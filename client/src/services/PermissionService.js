import axios from "../libs/axios";

async function getPermission() {
    return axios.get('/permission/self');
}

export default {
    getPermission,
}
