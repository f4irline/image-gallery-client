import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState as imagesState, imagesReducer, ImagesState } from './reducers/imagesReducer';

export interface State {
    imagesState: ImagesState
}

const initialState: State = {
    imagesState: imagesState
}

const rootReducer = combineReducers({
    imagesState: imagesReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
