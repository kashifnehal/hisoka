import * as actionTypes from './../actions/actionTypes'

const initialState = {
    profileUpdating: false
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

        default:
            return state;
    }
}