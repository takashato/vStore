import {atom, selector} from "recoil";
import {axiosClient} from "../../services";

export const userInfoState = atom({
    key: 'userInfo',
    default: {
        token: null,
    }
});

export const userTokenSelector = selector({
    key: 'userInfo/token',
    get: ({get}) => get(userInfoState).token,
    set: ({get, set}, newValue) => {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + newValue;
        set(userInfoState, {...get(userInfoState), token: newValue})
    }
});
