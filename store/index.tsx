import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState as imagesState, imagesReducer, ImagesState } from './reducers/imagesReducer';
import { initialState as userState, UserState, userReducer } from './reducers/userReducer';

export interface State {
    imagesState: ImagesState,
    userState: UserState,
}

const state: State = {
    imagesState: imagesState,
    userState: userState
}

const rootReducer = combineReducers({
    imagesState: imagesReducer,
    userState: userReducer
})

const store = createStore(rootReducer, state, composeWithDevTools());

export default store;
