import { State } from '../index';

import { User } from '../../models/User';
import { UserActions, UserActionTypes } from '../actions/userActions';

export interface UserState {
    user: User,
}

export const initialState: UserState = {
    user: {
        name: 'Placeholder User',
        token: '1234567890'
    },
};

export const userReducer = (state: UserState = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SetUser:
            return {
                ...state,
                images: action.payload,
            }
        
        default:
            return state;
    }
}

export const selectUser = (state: State) => state.userState.user;
