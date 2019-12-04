import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList } from 'react-native';

import { selectImages } from '../../store/reducers/imagesReducer';

import styles from '../../Styles';
import nearStyles from './Near.style';

import GalleryImage from '../../components/galleryImage/GalleryImage';
import FloatingButton from '../../components/floatingButton/FloatingButton';

const Near: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const images = useSelector(selectImages);

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={nearStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage description={true} navigation={navigation} borderWidth={2} spacing={2} padding={3} image={ item }/>}>
            </FlatList>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    )
}

Near.navigationOptions = {
    headerShown: false
}

export default Near;