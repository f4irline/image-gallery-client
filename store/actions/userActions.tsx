import { User } from "../../models/User"

export enum UserActionTypes {
    SetUser = '[User] Set User'
}

interface SetUserAction {
    type: UserActionTypes.SetUser,
    payload: User,
}

export type UserActions = SetUserAction;