import * as actionTypes from './actionTypes'
import axios from 'axios'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { startAddingPost } from './followingActions';

export const startLoadingCommunity = () => {
    return {
        type: actionTypes.START_LOADING_COMMUNITY
    }
}
export const startAddingCommunity = () => {
    return {
        type: actionTypes.START_ADDING_COMMUNITY
    }
}


export const loadCommunitySuccess = (allCommunity) => {
    return {
        type: actionTypes.LOAD_COMMUNITY_SUCCESS,
        allCommunity: allCommunity
    }
}
export const addCommunitySuccess = (newCommunity) => {
    return {
        type: actionTypes.ADD_COMMUNITY_SUCCESS,
        newCommunity: newCommunity
    }
}

export const loadCommunity = (profileId) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCommunity)
        const loadCommunityUrl = 'http://localhost:5000/community/' + profileId
        try {
            const res = await axios.get(loadCommunityUrl, tokenConfig(getState))
            dispatch(loadCommunitySuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}

export const addCommunity = (data, profileId) => {
    return async (dispatch, getState) => {
        dispatch(startAddingCommunity)
        const addCommunityUrl = 'http://localhost:5000/community/' + profileId
        try {
            const res = await axios.post(addCommunityUrl, data, tokenConfig(getState))
            dispatch(addCommunitySuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}