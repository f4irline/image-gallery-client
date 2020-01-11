import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { selectLoading } from '../../store/reducers/preferencesReducer';

import loadingStyles from './withLoading.style';

const withLoading = <P extends object>(
	WrappedComponent: React.ComponentType<P>,
	overlay?: boolean
): React.FC<P> => {
	const ComponentWithLoading = ({ ...props }) => {
		const loading = useSelector(selectLoading);
		return (
			<>
				<View
					style={[
						loading && overlay ? loadingStyles.overlay : undefined,
					]}></View>
				<WrappedComponent {...(props as P)} />
				{loading ? (
					<View style={loadingStyles.wrapper}>
						<ActivityIndicator
							style={loadingStyles.loadingIndicator}
							size="large"
							color="#eeeeee"
						/>
					</View>
				) : (
						undefined
					)}
			</>
		);
	};

	hoistNonReactStatic(ComponentWithLoading, WrappedComponent);

	return ComponentWithLoading;
};

export default withLoading;
