export const TOKEN_UPDATED = 'TOKEN_UPDATED';

export function setToken(token) {
    return {
        type: 'TOKEN_UPDATED',
        token: token,
    }
}