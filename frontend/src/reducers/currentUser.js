import {
    RECEIVE_CURRENT_USER,
    REQUEST_CURRENT_USER,
} from '../actions/currentUser'

const initialState = {
    loaded: false,
    loading: false,
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CURRENT_USER:
            return {
                loaded: false,
                loading: true,
            }
        case RECEIVE_CURRENT_USER:
            return {
                loading: false,
                loaded: true,
                user: action.payload,
            }
        default:
            return state
    }
}
