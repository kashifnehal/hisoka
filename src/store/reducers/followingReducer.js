import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loadingPost: false,
    allPosts: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_LOADING_POST:
            return {
                ...state,
                loadingPost: true
            };
        case actionTypes.LOAD_POST_SUCCESS:
            return {
                ...state,
                loadingPost: false,
                allPosts: action.allPosts
            };

        default:
            return state;
    }
}