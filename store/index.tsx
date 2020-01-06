import {
    combineReducers,
    createStore,
    applyMiddleware,
    Store,
    AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, Persistor } from 'redux-persist';

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
import { AsyncStorage } from 'react-native';

export interface AppState {
    imagesState: ImagesState;
    userState: UserState;
    preferencesState: PreferencesState;
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
});

export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
