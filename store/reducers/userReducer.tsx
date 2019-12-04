import { AppState } from '../index';

import { User } from '../../models/User';
import { UserActions, UserActionTypes } from '../actions/userActions';
import { Reducer } from 'react';
import uuid from 'uuid-js';

export interface UserState {
    user?: User,
}

export const initialState: UserState = {
    user: undefined,
};

export const userReducer: Reducer<UserState, UserActions> = (state: UserState = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SetUser:
            return {
                ...state,
                user: {
                    name: action.payload,
                    token: uuid.create().toString()
                },
            }
        
        default:
            return state;
    }
}

export const selectUser = (state: AppState) => state.userState.user;
