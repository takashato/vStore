import {atom, selector} from "recoil";

export const permissionState = atom({
    key: 'permissionState',
    default: {}
});

export const permissionSelector = selector({
    key: 'permissionState/selector',
    get: ({get}) => get(permissionState),
    set: ({get, set}, newValue) => {
        const oldValue = get(permissionState);
        const newToSet = {...newValue, ...oldValue};
        set(permissionState, newToSet);
    }
})
