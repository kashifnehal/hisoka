import * as actionTypes from './actionTypes'
import axios from 'axios'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const startLoadingWhatif = () => {
    return {
        type: actionTypes.START_LOADING_WHATIF
    }
}

export const loadWhatifSuccess = (whatifData) => {
    return {
        type: actionTypes.LOAD_WHATIF_SUCCESS,
        whatifData: whatifData
    }
}

export const addWhatifSuccess = (newWhatifData) => {
    return {
        type: actionTypes.ADD_WHATIF_SUCCESS,
        newWhatifData: newWhatifData
    }
}

export const loadWhatif = (profileId) => {
    return async (dispatch, getstate) => {
        dispatch(startLoadingWhatif())
        const whatifLoadUrl = 'http://localhost:5000/whatif'
        try {
            const res = await axios.get(whatifLoadUrl, tokenConfig(getstate))
            dispatch(loadWhatifSuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));

        }
    }
}


export const addWhatif = (data, profileId) => {
    return async (dispatch, getstate) => {
        dispatch(startLoadingWhatif())
        const whatifAddUrl = "http://localhost:5000/ProfileDetails/" + profileId + '/userWhatif'

        try {
            const res = await axios.post(whatifAddUrl, data, tokenConfig(getstate))
            dispatch(addWhatifSuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));

        }
    }
}