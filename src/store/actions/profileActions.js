import * as actionTypes from './actionTypes'
import axios from 'axios'
import { tokenConfig, loadUser } from './authActions';
import { returnErrors } from './errorActions';


export const profileUpdatingStart = () => {
    return {
        type: actionTypes.PROFILE_UPDATING_START
    }
}

export const profileUpdateSuccess = () => {
    return {
        type: actionTypes.PROFILE_UPDATE_SUCCESS
    }
}

export const updateProfile = (data, profileId) => {
    return async (dispatch, getstate) => {
        dispatch(profileUpdatingStart())
        const profilePatchUrl = "http://localhost:5000/ProfileDetails/" + profileId;
        try {
            const res = await axios.patch(profilePatchUrl, data, tokenConfig(getstate))
            dispatch(profileUpdateSuccess())
            dispatch(loadUser())
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}
