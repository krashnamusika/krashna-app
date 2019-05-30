export const REQUEST_CURRENT_USER = "REQUEST_CURRENT_USER"
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"

export const requestCurrentUser = () => ({
    type: REQUEST_CURRENT_USER,
})

export const receiveCurrentUser = payload => ({
    type: RECEIVE_CURRENT_USER,
    payload,
})
