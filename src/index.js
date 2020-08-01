import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './store/reducers/authReducer'
import errorReducer from './store/reducers/errorReducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import followingReducer from './store/reducers/followingReducer';
import commentReducer from './store/reducers/commentReducer';
import profileReducer from './store/reducers/profileReducer';
import whatifReducer from './store/reducers/whatifReducer';
import chatReducer from './store/reducers/chatReducer';


//this line can be problem as we are not using env anymore.
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    following: followingReducer,
    comment: commentReducer,
    profile: profileReducer,
    whatif: whatifReducer,
    chat: chatReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

