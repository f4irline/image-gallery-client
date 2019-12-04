import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { selectImages } from '../../store/reducers/imagesReducer';
import { loadImages } from '../../store/actions/imagesActions';

import styles from '../../Styles';
import homeStyles from './Home.style';

import FloatingButton from '../../components/floatingButton/FloatingButton';
import GalleryImage from '../../components/galleryImage/GalleryImage';

const Home: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const images = useSelector(selectImages);

    useEffect(() => {
        dispatch(loadImages());
    }, [])

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={homeStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage description={true} navigation={navigation} spacing={2} borderWidth={2} padding={3} image={ item }/>}>
            </FlatList>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;