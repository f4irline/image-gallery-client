export enum UserActionTypes {
    SetUser = '[User] Set User'
}

interface SetUserAction {
    type: UserActionTypes.SetUser,
    payload: string,
}

export type UserActions = SetUserAction;