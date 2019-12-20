import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { api } from "../../utils";
import { User } from "../../models";
import { AnyAction } from "redux";
import { setUserImages } from "../actions/imagesActions";

export enum UserActionTypes {
    SetUser = '[User] Set User',
    Login = '[User] Login',
    Logout = '[User] Logout'
}

interface SetUserAction {
    type: UserActionTypes.SetUser;
    payload: User;
}

interface LoginAction {
    type: UserActionTypes.Login,
}

interface LogoutAction {
    type: UserActionTypes.Logout,
}

const setUser = (user: User | undefined) => {
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

export const logoutUser = (): ThunkAction<Promise<void>, {}, {}, LogoutAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch<any>(setUserImages([]));
        dispatch<any>(setUser(undefined));
    }
}

export type UserActions = SetUserAction;