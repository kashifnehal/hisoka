import * as actionTypes from './../actions/actionTypes'

const initialState = {
    allCommunity: null,
    loadingCommunity: null
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_LOADING_COMMUNITY:
            return {
                ...state,
                loadingCommunity: true
            };
        case actionTypes.LOAD_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingCommunity: false,
                allCommunity: action.allCommunity,
            };
        case actionTypes.ADD_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingCommunity: false,
                allCommunity: [action.newCommunity, ...state.allCommunity],
            };

        default:
            return state;
    }
}