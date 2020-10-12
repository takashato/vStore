import {atom, selector} from "recoil";

export const themeState = atom({
    key: 'themeState',
    default: {
        theme: null,
    },
});

export const themeSelector = selector({
    key: 'themeState/selector',
    get: ({get}) => get(themeState).theme,
    set: ({set, get}, newValue) => {
        const oldState = get(themeState);
        if (newValue === oldState.theme) return;
        const newState = {...oldState, theme: newValue};
        set(themeState, newState);
        localStorage.set('theme', newState);
    }
});
