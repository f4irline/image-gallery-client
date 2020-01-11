import { Reducer } from 'redux';

import { AppState } from '../index';

import { MessageActions, MessageActionTypes } from '../actions/messageActions';

export enum MessageTypes {
	WARNING = 'warning',
	ERROR = 'error',
	SUCCESS = 'success',
}

export interface MessageState {
	readonly message: string;
	readonly messageType: MessageTypes;
	readonly state: boolean;
}

const initialState = {
	state: false,
	message: '',
	messageType: MessageTypes.WARNING,
};

export const messageReducer: Reducer<MessageState, MessageActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MessageActionTypes.NewMessage: {
			return {
				...state,
				message: action.payload.message || state.message,
				state: action.payload.state,
				messageType: action.payload.messageType || state.messageType,
			};
		}

		case MessageActionTypes.DismissMessage: {
			return {
				...state,
				message: '',
				state: false,
			};
		}

		default: {
			return state;
		}
	}
};

export const selectMessage = (state: AppState) => state.messageState;
