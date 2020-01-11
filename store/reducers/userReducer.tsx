import { Reducer } from 'react';

import { AppState } from '../index';

import { User, Comment } from '../../models';

import { UserActions, UserActionTypes } from '../actions/userActions';

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

		case UserActionTypes.RemoveUserComment:
			return {
				...state,
				comments: [...state.comments].filter(
					comment => comment.id !== action.payload.comment.id
				),
			};

		case UserActionTypes.AddUserComment:
			return {
				...state,
				comments: [action.payload.comment, ...state.comments],
			};

		default:
			return state;
	}
};

export const selectUser = (state: AppState) => state.userState.user;
export const selectLoginSuccess = (state: AppState) =>
	state.userState.loginSuccess;
export const selectComments = (state: AppState) => state.userState.comments;
