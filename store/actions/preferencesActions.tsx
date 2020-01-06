export enum PreferencesActionTypes {
    SetKeyboardHeight = '[Preferences] Set Keyboard Height',
    SetLoading = '[Preferences] Set Loading',
}

interface SetKeyboardHeight {
    type: PreferencesActionTypes.SetKeyboardHeight;
    payload: number;
}

interface SetLoading {
    type: PreferencesActionTypes.SetLoading;
    payload: boolean;
}

export type PreferencesActions = SetKeyboardHeight | SetLoading;
