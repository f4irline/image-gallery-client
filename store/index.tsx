import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

import {
    initialState as imagesState,
    imagesReducer,
    ImagesState,
} from './reducers/imagesReducer';
import {
    initialState as userState,
    UserState,
    userReducer,
} from './reducers/userReducer';
import {
    initialState as preferencesState,
    preferencesReducer,
    PreferencesState,
} from './reducers/preferencesReducer';
import { messageReducer, MessageState } from './reducers/messageReducer';
import { AsyncStorage } from 'react-native';

export interface AppState {
    imagesState: ImagesState;
    userState: UserState;
    preferencesState: PreferencesState;
    messageState: MessageState;
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['comments'],
};

const rootReducer = combineReducers({
    imagesState: imagesReducer,
    userState: persistReducer(persistConfig, userReducer),
    preferencesState: preferencesReducer,
    messageState: messageReducer,
});

export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
