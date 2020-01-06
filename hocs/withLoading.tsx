import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLoading } from '../store/reducers/preferencesReducer';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withLoading = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const ComponentWithLoading = ({ ...props }) => {
        const loading = useSelector(selectLoading);
        return (
            <>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    undefined
                )}
                <WrappedComponent {...(props as P)} />
            </>
        );
    };

    hoistNonReactStatic(ComponentWithLoading, WrappedComponent);

    return ComponentWithLoading;
};

export default withLoading;
