import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { initialState as imagesState, imagesReducer, ImagesState } from './reducers/imagesReducer';
import { initialState as userState, UserState, userReducer } from './reducers/userReducer';

export interface AppState {
    imagesState: ImagesState,
    userState: UserState
}

const rootReducer = combineReducers({
    imagesState: imagesReducer,
    userState: userReducer
})

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));

export default store;
