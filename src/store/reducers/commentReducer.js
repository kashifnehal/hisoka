import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loadingComments: null,
    allComments: [],
    postId: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_LOADING_COMMENT:
            return {
                ...state,
                loadingComments: true
            };
        case actionTypes.LOAD_COMMENT_SUCCESS:
            return {
                ...state,
                loadingComment: false,
                allComments: action.allComments,
                postId: action.postId
            };
        case actionTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                loadingComments: false,
                allComments: [action.newComment, ...state.allComments],
            };

        default:
            return state;
    }
}