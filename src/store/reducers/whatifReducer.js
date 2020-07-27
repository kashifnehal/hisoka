import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loadingWhatif: null,
    whatifData: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_LOADING_WHATIF:
            return {
                ...state,
                loadingWhatif: true
            };
        case actionTypes.LOAD_WHATIF_SUCCESS:
            return {
                ...state,
                loadingWhatif: false,
                whatifData: action.whatifData
            };
        case actionTypes.ADD_WHATIF_SUCCESS:
            return {
                ...state,
                loadingWhatif: false,
                whatifData: [action.newWhatifData, ...state.whatifData],
            };
        default:
            return state;
    }
}