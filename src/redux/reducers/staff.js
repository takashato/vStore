import {TOKEN_UPDATED} from "../actions/staff";

const initialState = {
    staff: null,
    token: null,
};

export default function staff(state = initialState, action) {
    if (action.type === TOKEN_UPDATED) {
        return {...state, token: action.token};
    }
    return state;
}