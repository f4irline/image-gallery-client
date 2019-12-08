export enum PreferencesActionTypes {
    SetKeyboardHeight = '[Preferences] Set Keyboard Height'
}

interface SetKeyboardHeight {
    type: PreferencesActionTypes.SetKeyboardHeight;
    payload: number;
}

export type PreferencesActions = SetKeyboardHeight;