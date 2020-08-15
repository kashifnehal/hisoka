import * as actionTypes from './../actions/actionTypes'

const initialState = {
    allCommunity: null,
    allUserCommunity: null,
    allUnivCommunity: null,
    allFolCommunity: null,
    loadingCommunity: null,
    loadingUnivCommunity: null,
    loadingUserCommunity: null,
    loadingFolCommunity: null,
    folComLoader: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_LOADING_COMMUNITY:
            return {
                ...state,
                loadingCommunity: true
            };
        case actionTypes.START_LOADING_USER_COMMUNITY:
            return {
                ...state,
                loadingUserCommunity: true
            };
        case actionTypes.START_LOADING_UNIV_COMMUNITY:
            return {
                ...state,
                loadingUnivCommunity: true
            };
        case actionTypes.LOAD_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingCommunity: false,
                allCommunity: action.allCommunity,
            };
        case actionTypes.LOAD_UNIV_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingUnivCommunity: false,
                allUnivCommunity: action.allUnivCommunity,
            };
        case actionTypes.LOAD_USER_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingUserCommunity: false,
                allUserCommunity: action.allUserCommunity,
            };
        case actionTypes.ADD_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingCommunity: false,
                allCommunity: [action.newCommunity, ...state.allCommunity],
            };
        case actionTypes.START_FOLCOM_LOADER:
            console.log('in start loader');
            return {
                ...state,
                folComLoader: true,
            };
        case actionTypes.STOP_FOLCOM_LOADER:
            console.log('in stop loader');
            return {
                ...state,
                folComLoader: false,
            };
        case actionTypes.START_LOADING_FOL_COMMUNITY:
            return {
                ...state,
                loadingFolCommunity: true,
            };
        case actionTypes.LOAD_FOL_COMMUNITY_SUCCESS:
            return {
                ...state,
                loadingFolCommunity: false,
                allFolCommunity: action.allFolCommunity,
            };

        default:
            return state;
    }
}