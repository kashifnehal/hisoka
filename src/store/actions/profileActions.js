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

export const getUserPostSuccess = (allUserPosts) => {
    return {
        type: actionTypes.GET_USER_POST_SUCCESS,
        allUserPosts: allUserPosts
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

export const getUserPosts = (profileId) => {
    return async (dispatch, getstate) => {
        dispatch(profileUpdatingStart)
        const getUserPostsUrl = "http://localhost:5000/ProfileDetails/" + profileId + '/userposts';
        try {
            const res = await axios.get(getUserPostsUrl, tokenConfig(getstate))
            dispatch(getUserPostSuccess(res.data))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}

// router.get('/:profileId/userposts', auth, function (req, res) {
//     ProfileDetails.findById(req.params.profileId).populate('userposts')
//         .then(profile => res.json(profile.userposts))
//         .catch(err => res.status(400).json('Error: ' + err));

// })