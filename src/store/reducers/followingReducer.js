import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loadingPost: false,
    allPosts: [],
    addingPostLoader: false,
    newPost: []
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
        case actionTypes.START_ADDING_POST:
            return {
                ...state,
                addingPostLoader: true
            };
        case actionTypes.ADD_POST_SUCCESS:
            console.log('from reducer newpost', action.newPost);
            return {
                ...state,
                addingPostLoader: false,
                allPosts: [action.newPost, ...state.allPosts],
                // addingPostLoader: false
            };

        default:
            return state;
    }
}