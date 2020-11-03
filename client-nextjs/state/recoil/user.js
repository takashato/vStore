import {atom, selector} from "recoil";

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
        set(userInfoState, {...get(userInfoState), token: newValue})
    }
});
