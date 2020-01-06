import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { api } from '../../utils';
import { User } from '../../models';
import { AnyAction } from 'redux';
import { ImagesActionTypes } from '../actions/imagesActions';
import { PreferencesActionTypes } from './preferencesActions';

export enum UserActionTypes {
    SetUser = '[User] Set User',

    Login = '[User] Login',
    LoginSuccess = '[User] Login Success',

    Logout = '[User] Logout',
}

interface SetUserAction {
    type: UserActionTypes.SetUser;
    payload: User;
}

interface LoginAction {
    type: UserActionTypes.Login;
}

interface LoginSuccessAction {
    type: UserActionTypes.LoginSuccess;
    payload: boolean;
}

interface LogoutAction {
    type: UserActionTypes.Logout;
}

const setUser = (user: User | undefined) => {
    return {
        type: UserActionTypes.SetUser,
        payload: user,
    };
};

export const loginSuccess = (success: boolean) => {
    return {
        type: UserActionTypes.LoginSuccess,
        payload: success,
    };
};

export const loginUser = (
    name: string
): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetUserAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            const user = await api.post(`/user/register`, {
                name: name,
            });
            dispatch<any>(loginSuccess(true));
            dispatch<any>(
                setUser({
                    name: name,
                    token: user.data.token,
                })
            );
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export const logoutUser = (): ThunkAction<
    Promise<void>,
    {},
    {},
    LogoutAction
> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch<any>({
            type: ImagesActionTypes.SetUserImages,
            payload: [],
        });
        dispatch<any>(setUser(undefined));
    };
};

export type UserActions = SetUserAction | LoginSuccessAction;
