import { User } from "../../models/User"

export enum UserActionTypes {
    SetUser = '[Images] Set Images'
}

interface SetUserAction {
    type: UserActionTypes.SetUser,
    payload: User,
}

export type UserActions = SetUserAction;