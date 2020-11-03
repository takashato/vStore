import {axiosClient} from "./index";

function doLogin({username, password}) {
    return axiosClient.post('/staff/auth', {
        username,
        password,
    });
}

export default {
    doLogin,
}
