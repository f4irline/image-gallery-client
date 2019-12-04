import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList, RefreshControl } from 'react-native';

import { selectImages, selectRefreshingImages } from '../../store/reducers/imagesReducer';
import { loadImages } from '../../store/actions/imagesActions';

import styles from '../../Styles';
import nearStyles from './Near.style';

import GalleryImage from '../../components/galleryImage/GalleryImage';
import FloatingButton from '../../components/floatingButton/FloatingButton';

const Near: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const images = useSelector(selectImages);
    const refreshing = useSelector(selectRefreshingImages);

    const refreshImages = () => {
        dispatch(loadImages());
    }

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={nearStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage description={true} navigation={navigation} borderWidth={2} spacing={2} padding={3} image={ item }/>}
                refreshControl={
                    <RefreshControl onRefresh={refreshImages} refreshing={refreshing}/>
                }>>
            </FlatList>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    )
}

Near.navigationOptions = {
    headerShown: false
}

export default Near;