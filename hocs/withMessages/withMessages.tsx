import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import hoistNonReactStatic from 'hoist-non-react-statics';
import { selectMessage } from '../../store/reducers/messageReducer';
import { MessageActionTypes } from '../../store/actions/messageActions';

const withMessages = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const ComponentWithLoading = ({ ...props }) => {
        const dispatch = useDispatch();
        const message = useSelector(selectMessage);

        const dismissMessage = () => {
            dispatch({
                type: MessageActionTypes.DismissMessage,
            });
        };

        return (
            <>
                <WrappedComponent {...(props as P)} />
                <SnackBar
                    visible={message.state}
                    textMessage={message.message}
                    position={'bottom'}
                    actionText="Ok"
                    actionHandler={dismissMessage}
                />
            </>
        );
    };

    hoistNonReactStatic(ComponentWithLoading, WrappedComponent);

    return ComponentWithLoading;
};

export default withMessages;
