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
export const startLoadingUserCommunity = () => {
    return {
        type: actionTypes.START_LOADING_USER_COMMUNITY
    }
}
export const startLoadingUnivCommunity = () => {
    return {
        type: actionTypes.START_LOADING_UNIV_COMMUNITY
    }
}



export const loadCommunitySuccess = (allCommunity) => {
    return {
        type: actionTypes.LOAD_COMMUNITY_SUCCESS,
        allCommunity: allCommunity
    }
}
export const loadUserCommunitySuccess = (allUserCommunity) => {
    return {
        type: actionTypes.LOAD_USER_COMMUNITY_SUCCESS,
        allUserCommunity: allUserCommunity
    }
}
export const loadUnivCommunitySuccess = (allUnivCommunity) => {
    return {
        type: actionTypes.LOAD_UNIV_COMMUNITY_SUCCESS,
        allUnivCommunity: allUnivCommunity
    }
}

export const startAddingCommunity = () => {
    return {
        type: actionTypes.START_ADDING_COMMUNITY
    }
}
export const addCommunitySuccess = (newCommunity) => {
    return {
        type: actionTypes.ADD_COMMUNITY_SUCCESS,
        newCommunity: newCommunity
    }
}

export const loadCommunity = () => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCommunity)
        const loadCommunityUrl = 'http://localhost:5000/community/'
        try {
            const res = await axios.get(loadCommunityUrl, tokenConfig(getState))
            dispatch(loadCommunitySuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}
export const loadUserCommunity = (profileId) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUserCommunity)
        const loadUserCommunityUrl = 'http://localhost:5000/community/' + profileId
        try {
            const res = await axios.get(loadUserCommunityUrl, tokenConfig(getState))
            dispatch(loadUserCommunitySuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}

export const loadUnivCommunity = (univName) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUnivCommunity)
        const loadUnivCommunityUrl = 'http://localhost:5000/community/of/' + univName
        console.log('univ name', univName);
        try {
            const res = await axios.get(loadUnivCommunityUrl, tokenConfig(getState))
            console.log('univ data', res.data);
            dispatch(loadUnivCommunitySuccess(res.data))
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