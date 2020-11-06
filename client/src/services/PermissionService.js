import axios from "../libs/axios";

async function getPermission() {
    return axios.get('/permission/self');
}

async function getGroups() {
    return axios.get('/staff-group');
}

async function getGroup({groupId}) {
    return axios.get('/staff-group/' + groupId);
}

export default {
    getPermission,
    getGroups,
    getGroup,
}
