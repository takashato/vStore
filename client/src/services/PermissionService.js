import axios from "../libs/axios";

async function getPermission(keyList) {
    if (!Array.isArray(keyList)) {
        keyList = [keyList];
    }
    return axios.get('/permission/self', {
        params: {
            list: keyList.join(','),
        }
    });
}

export default {
    getPermission,
}
