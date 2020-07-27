import * as actionTypes from './actionTypes'
import axios from 'axios'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const startLoadingComment = () => {
    return {
        type: actionTypes.START_LOADING_COMMENT
    }
}

export const loadCommentSuccess = (allComments, postId) => {
    return {
        type: actionTypes.LOAD_COMMENT_SUCCESS,
        allComments: allComments,
        postId: postId
    }
}

export const addCommentSuccess = (newComment) => {
    console.log('newcomment', newComment)
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        newComment: newComment
    }
}



export const loadComment = (postId) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingComment())
        const commentLoadUrl = 'http://localhost:5000/postPage/' + postId + '/comments'
        try {
            const res = await axios.get(commentLoadUrl, tokenConfig(getState))
            dispatch(loadCommentSuccess(res.data, postId))
        } catch (err) {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    }
}


export const addComment = (data, postId) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingComment())
        const commentAddUrl = 'http://localhost:5000/postPage/' + postId + '/comments'

        try {
            const res = await axios.post(commentAddUrl, data, tokenConfig(getState))
            dispatch(addCommentSuccess(res.data))
        } catch (err) {
            // alert("Incorrect User ID / Password");
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    };
};

// export const addComment = (data, postId) => {
//     console.log('comment add details', data, postId)
//     return async (dispatch, getState) => {
//         dispatch(startLoadingComment())
//         const commentAddUrl = 'http://localhost:5000/postPage/' + postId + '/comments'
//         try {
//             const res = await axios.post(commentAddUrl, data, tokenConfig(getState))
//             dispatch(addCommentSuccess(res.data))
//             console.log('res data comment', res.data)
//         } catch (err) {
//             dispatch(returnErrors(err.response.data, err.response.status));
//         }
//     }
// }
