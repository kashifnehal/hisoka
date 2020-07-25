import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './actionTypes';
// import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';



// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
    // console.log('load user with profile inside authaction');
    // User loading
    dispatch({ type: USER_LOADING });
    try {
        const res = await axios.get('http://localhost:5000/auth/profile', tokenConfig(getState))
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        // console.log('loaded res data', res.data)
    } catch (err) {
        // dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    }

};

// Register User
export const register = (registrationDetails) => async (dispatch) => {
    // Headers
    // console.log('r details', registrationDetails)
    const username = registrationDetails.username
    const password = registrationDetails.password
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // console.log('from register', username, password)

    // Request body

    // const body = JSON.stringify({ username, password });
    // const body = JSON.stringify({ registrationDetails });
    try {

        const res = await axios.post('http://localhost:5000/profileDetails', registrationDetails, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        // console.log('from reg action', res.data);
        dispatch(loadUser())
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        });
    }
    // axios
    //     .post('http://localhost:5000/profileDetails', body, config)
    //     .then(res =>
    //         dispatch({
    //             type: REGISTER_SUCCESS,
    //             payload: res.data
    //         })
    //     )
    //     .catch(err => {
    //         dispatch(
    //             returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    //         );
    //         dispatch({
    //             type: REGISTER_FAIL
    //         });
    //     });
};

// Login User
export const login = (username, password) => async (
    dispatch
) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post('http://localhost:5000/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
            type: LOGIN_FAIL
        });
    }
    // axios.post('http://localhost:5000/auth', body, config)
    //     .then(res =>
    //         dispatch({
    //             type: LOGIN_SUCCESS,
    //             payload: res.data
    //         })
    //     )
    //     .catch(err => {
    //         dispatch(
    //             returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
    //         );
    //         dispatch({
    //             type: LOGIN_FAIL
    //         });
    //     });
};

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};