import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { api } from "../../utils";
import { User } from "../../models";
import { ActionSheetIOS } from "react-native";

export enum UserActionTypes {
    SetUser = '[User] Set User',
    Login = '[User] Login',
}

interface SetUserAction {
    type: UserActionTypes.SetUser;
    payload: User;
}

interface LoginAction {
    type: UserActionTypes.Login,
}

const setUser = (user: User) => {
    return {
        type: UserActionTypes.SetUser,
        payload: user
    };
};

export const loginUser = (
    name: string
): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetUserAction>
    ): Promise<void> => {
        try {
            const user = await api.post(`/user/register`, {
                name: name
            });
            dispatch<any>(setUser({
                name: name,
                token: user.data.token
            }));
        } catch (err) {
            console.log(err);
        }
    }
}

export type UserActions = SetUserAction;