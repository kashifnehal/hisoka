import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loadingComments: null,
    allComments: [],
    postId: '',
    chats: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CHATS:
            return { ...state, chats: action.payload }
        case actionTypes.AFTER_POST_MESSAGE:
            return {
                ...state,
                // chats: [action.chats, ...state.chats],
                chats: state.chats.concat(action.payload)
            }
        default:
            return state;
    }
} 