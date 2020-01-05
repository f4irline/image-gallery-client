import { Reducer } from 'redux';
import { AppState } from '../index';
import {
    PreferencesActions,
    PreferencesActionTypes,
} from '../actions/preferencesActions';

export interface PreferencesState {
    keyboardHeight: number;
}

export const initialState: PreferencesState = {
    keyboardHeight: 0,
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

        default:
            return state;
    }
};

export const selectKeyboardHeight = (state: AppState) =>
    state.preferencesState.keyboardHeight;
