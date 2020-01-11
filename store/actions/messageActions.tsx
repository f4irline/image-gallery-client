import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { MessageTypes } from '../reducers/messageReducer';

export interface Message {
	readonly message: string;
	readonly messageType: MessageTypes;
	readonly state: boolean;
}

export enum MessageActionTypes {
	NewMessage = '[Message] New Message',
	DismissMessage = '[Message] Dismiss Message',
}

export interface NewMessageAction {
	type: MessageActionTypes.NewMessage;
	payload: Message;
}

export interface DismissMessageAction {
	type: MessageActionTypes.DismissMessage;
}

export const newMessage = (
	message: Message
): ThunkAction<Promise<void>, {}, {}, NewMessageAction> => {
	return async (
		dispatch: ThunkDispatch<{}, {}, AnyAction>
	): Promise<void> => {
		dispatch({
			type: MessageActionTypes.NewMessage,
			payload: message,
		});

		setTimeout(() => {
			dispatch({
				type: MessageActionTypes.DismissMessage,
			});
		}, 5000);
	};
};

export type MessageActions = NewMessageAction | DismissMessageAction;
