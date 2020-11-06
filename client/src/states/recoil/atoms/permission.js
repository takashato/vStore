import {atom, selector} from "recoil";

export const permissionState = atom({
    key: 'permissionState',
    default: {
        _default: false,
    }
});

export const permissionSelector = selector({
    key: 'permissionState/selector',
    get: ({get}) => get(permissionState),
    set: async ({get, set}, newValue) => {
        const oldValue = get(permissionState);
        const newToSet = {...newValue, ...oldValue};
        await set(permissionState, newToSet);
    }
})
