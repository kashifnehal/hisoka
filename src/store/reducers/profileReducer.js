import * as actionTypes from './../actions/actionTypes'

const initialState = {
    profileUpdating: null,
    allUserPosts: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.PROFILE_UPDATING_START:
            return {
                ...state,
                profileUpdating: true
            };
        case actionTypes.PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                profileUpdating: false
            };
        case actionTypes.GET_USER_POST_SUCCESS:
            return {
                ...state,
                allUserPosts: action.allUserPosts,
                profileUpdating: false,

            };

        default:
            return state;
    }
}