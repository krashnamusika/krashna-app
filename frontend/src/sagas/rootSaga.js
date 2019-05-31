import { all } from 'redux-saga/effects'
import { watchCurrentUser } from './currentUser'

export default function* rootSaga() {
    yield all([watchCurrentUser()])
}
