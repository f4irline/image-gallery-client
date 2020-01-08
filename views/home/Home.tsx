import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList, RefreshControl, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import {
    selectImages,
    selectRefreshingImages,
} from '../../store/reducers/imagesReducer';
import { loadImages } from '../../store/actions/imagesActions';

import styles from '../../Styles';
import homeStyles from './Home.style';

import FloatingButton from '../../components/floatingButton/FloatingButton';
import GalleryImage from '../../components/galleryImage/GalleryImage';
import { PreferencesActionTypes } from '../../store/actions/preferencesActions';
import withLoading from '../../hocs/withLoading/withLoading';
import withMessages from '../../hocs/withMessages/withMessages';

const Home: NavigationStackScreenComponent = props => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const images = useSelector(selectImages);
    const refreshing = useSelector(selectRefreshingImages);

    Keyboard.addListener('keyboardDidShow', e => {
        dispatch({
            type: PreferencesActionTypes.SetKeyboardHeight,
            payload: e.endCoordinates.height,
        });
    });

    Keyboard.addListener('keyboardDidHide', e => {
        dispatch({
            type: PreferencesActionTypes.SetKeyboardHeight,
            payload: 0,
        });
    });

    useEffect(() => {
        dispatch(loadImages());
    }, []);

    const refreshImages = () => {
        dispatch(loadImages());
    };

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={homeStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images}
                renderItem={({ item }) => (
                    <GalleryImage
                        description={true}
                        navigation={navigation}
                        spacing={2}
                        borderWidth={2}
                        padding={3}
                        image={item}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        onRefresh={refreshImages}
                        refreshing={refreshing}
                    />
                }></FlatList>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    );
};

Home.navigationOptions = {
    headerShown: false,
};

export default withMessages(withLoading(Home, true));
