import axios from 'axios';
import * as actionTypes from './actionTypes'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// export function getChats() {
//     dispatch({ type: USER_LOADING });
//     try {
//         const getChatUrl = 'http://localhost:5000/chat'
//         const res = await axios.get('http://localhost:5000/auth/profile', tokenConfig(getState))
//         dispatch({
//             type: USER_LOADED,
//             payload: res.data
//         })
//         // console.log('loaded res data', res.data)
//     } catch (err) {
//         // dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({
//             type: AUTH_ERROR
//         });
//     }
// const getChatUrl = 'http://localhost:5000/chat'
// const request = axios.get(getChatUrl)
//     .then(response => response.data);
// console.log('from chat action ', request)
// return {
//     type: actionTypes.GET_CHATS,
//     payload: request
// }
// }

export const getChats = () => {
    return async (dispatch, getState) => {
        const getChatUrl = 'http://localhost:5000/chat'
        try {
            const res = await axios.get(getChatUrl, tokenConfig(getState))
            dispatch({
                type: actionTypes.GET_CHATS,
                payload: res.data
            })
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}



export function afterPostMessage(data) {

    return {
        type: actionTypes.AFTER_POST_MESSAGE,
        payload: data
    }
}