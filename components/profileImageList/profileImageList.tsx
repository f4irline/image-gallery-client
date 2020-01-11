import React from 'react';
import { RefreshControl, FlatList, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import {
	selectRefreshingUserImages,
	selectUserImages,
} from '../../store/reducers/imagesReducer';
import { loadUserImages } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';

import styles from '../../Styles';
import imageListStyles from './profileImageList.style';

import GalleryImage from '../galleryImage/GalleryImage';

interface Props {
	navigation: NavigationStackProp;
}

const ProfileImageList: React.FC<Props> = (props: Props) => {
	const { navigation } = props;

	const dispatch = useDispatch();

	const refreshing = useSelector(selectRefreshingUserImages);
	const images = useSelector(selectUserImages);
	const user = useSelector(selectUser);

	const refreshImages = () => {
		if (!user || !user.token) {
			return;
		}

		dispatch(loadUserImages(user.token));
	};

	return images.length ? (
		<FlatList
			numColumns={2}
			style={imageListStyles.imageList}
			keyExtractor={item => `image-${item.id}`}
			data={images}
			renderItem={({ item }) => (
				<GalleryImage navigation={navigation} image={item} />
			)}
			refreshControl={
				<RefreshControl
					onRefresh={refreshImages}
					refreshing={refreshing}
				/>
			}></FlatList>
	) : (
			<View style={styles.emptyList}>
				<Text style={styles.emptyListText}>
					You haven't uploaded any images yet!
            </Text>
			</View>
		);
};

export default ProfileImageList;
