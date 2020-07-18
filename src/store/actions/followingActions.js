import * as actionTypes from './actionTypes'
import axios from 'axios'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { data } from 'autoprefixer';

// export const loadPost = () => {
//     return dispatch => {
//         axios.get('http://localhost:5000/postPage/')
//             .then(res => {
//                 this.setState({ postData: res.data })
//             })
//             .catch(err => returnErrors(err.response.data, err.response.status))
//     }
// }

export const startLoadingPost = () => {
    return {
        type: actionTypes.START_LOADING_POST,
    }
}

export const loadPostSuccess = (allPosts) => {
    return {
        type: actionTypes.LOAD_POST_SUCCESS,
        allPosts: allPosts
    }
}



export const loadPost = () => {
    console.log('inside loadpost action')
    return async (dispatch, getState) => {
        dispatch(startLoadingPost());

        const getPostUrl =
            'http://localhost:5000/postPage/';

        try {
            console.log('inside try f action');
            const res = await axios.get(getPostUrl, tokenConfig(getState));
            dispatch(loadPostSuccess(res.data))
        } catch (err) {
            // alert("Incorrect User ID / Password");
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    };
};

export const addPost = (data) => {
    console.log('inside addpost action')
    return async (dispatch, getState) => {
        // dispatch(startLoadingPost());

        const addPostUrl =
            'http://localhost:5000/postPage/';

        try {
            const res = await axios.post(addPostUrl, tokenConfig(getState), data);
            // dispatch(addPostSuccess(res.data))
        } catch (err) {
            // alert("Incorrect User ID / Password");
            dispatch(returnErrors(err.response.data, err.response.status));
        }
    };
};

// axios.post('http://localhost:5000/postPage/', data)
//             .then(res => console.log(res))
//             .catch(err => console.log(err))

//         console.log('post added')