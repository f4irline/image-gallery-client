import { Reducer } from 'react';
import uuid from 'uuid-js';

import { UserActions, UserActionTypes } from '../actions/userActions';

import { User, Comment } from '../../models';

import { AppState } from '../index';

export interface UserState {
    user?: User;
    loginSuccess: boolean;
    comments: Comment[];
}

export const initialState: UserState = {
    user: undefined,
    loginSuccess: false,
    comments: [],
};

export const userReducer: Reducer<UserState, UserActions> = (
    state: UserState = initialState,
    action: UserActions
) => {
    switch (action.type) {
        case UserActionTypes.SetUser:
            return {
                ...state,
                user: action.payload,
            };

        case UserActionTypes.LoginSuccess:
            return {
                ...state,
                loginSuccess: action.payload,
            };

        case UserActionTypes.SetUserComments:
            return {
                ...state,
                comments: action.payload,
            };

        default:
            return state;
    }
};

export const selectUser = (state: AppState) => state.userState.user;
export const selectLoginSuccess = (state: AppState) =>
    state.userState.loginSuccess;
export const selectComments = (state: AppState) => state.userState.comments;
