import { Reducer } from 'redux';

import { AppState } from '../index';

import {
	PreferencesActions,
	PreferencesActionTypes,
} from '../actions/preferencesActions';

export interface PreferencesState {
	keyboardHeight: number;
	loading: boolean;
}

export const initialState: PreferencesState = {
	keyboardHeight: 0,
	loading: false,
};

export const preferencesReducer: Reducer<
	PreferencesState,
	PreferencesActions
> = (state: PreferencesState = initialState, action: PreferencesActions) => {
	switch (action.type) {
		case PreferencesActionTypes.SetKeyboardHeight:
			return {
				...state,
				keyboardHeight: action.payload,
			};

		case PreferencesActionTypes.SetLoading:
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};

export const selectKeyboardHeight = (state: AppState) =>
	state.preferencesState.keyboardHeight;

export const selectLoading = (state: AppState) =>
	state.preferencesState.loading;
