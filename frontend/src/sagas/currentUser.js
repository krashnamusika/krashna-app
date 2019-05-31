import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
    receiveCurrentUser,
    REQUEST_CURRENT_USER,
} from '../actions/currentUser'

function* requestCurrentUser() {
    const response = yield axios.get('/api/auth/current-user', {
        headers: { Authorization: localStorage.JWT },
    })
    yield put(receiveCurrentUser(response.data))
}

export function* watchCurrentUser() {
    yield takeLatest(REQUEST_CURRENT_USER, requestCurrentUser)
}
