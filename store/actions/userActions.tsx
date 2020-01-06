import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { api } from '../../utils';
import { User, Comment } from '../../models';
import { AnyAction } from 'redux';
import { ImagesActionTypes } from '../actions/imagesActions';
import { PreferencesActionTypes } from './preferencesActions';

export enum UserActionTypes {
    SetUser = '[User] Set User',

    Login = '[User] Login',
    LoginSuccess = '[User] Login Success',

    Logout = '[User] Logout',

    LoadUserComments = '[User] Load User Comments',
    SetUserComments = '[User] Set User Comments',
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

interface LoadUserCommentsAction {
    type: UserActionTypes.LoadUserComments;
}

interface SetUserCommentsAction {
    type: UserActionTypes.SetUserComments;
    payload: Comment[];
}

const setUser = (user: User | undefined) => {
    return {
        type: UserActionTypes.SetUser,
        payload: user,
    };
};

const setComments = (comments: Comment[]) => {
    return {
        type: UserActionTypes.SetUserComments,
        payload: comments,
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

export const loadUserComments = (
    token?: string
): ThunkAction<Promise<void>, {}, {}, LoadUserCommentsAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        try {
            const comments = await api.get(`/comment/${token}`);
            const commentsData: Comment[] = comments.data;
            dispatch<any>(setComments(commentsData));
        } catch (err) {
            console.log(err);
        }
    };
};

export type UserActions =
    | SetUserAction
    | LoginSuccessAction
    | SetUserCommentsAction;
