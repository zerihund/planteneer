import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase"
import {firestoreReducer} from 'redux-firestore'
import gardensReducer from './gardensReducer'
import diaryReducer from './diaryReducer'

import authReducer from './authReducer'

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    gardens: gardensReducer,
    diary: diaryReducer
})