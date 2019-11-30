import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectImages } from '../../store/reducers/imagesReducer';
import { imagesActionTypes } from '../../store/actions/imagesActions';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList } from 'react-native';

import api from '../../utils/api/Api';
import styles from '../../Styles';
import homeStyles from './Home.style';

import GalleryImage from '../../components/GalleryImage/GalleryImage';
import AddNew from '../../components/AddNew/AddNew';

const Home: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const images = useSelector(selectImages);

    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async () => {
        try {
            const images = await api.get('/');
            dispatch({
                type: imagesActionTypes.SET_IMAGES,
                payload: images.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={homeStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage navigation={navigation} image={ item }/>}>
            </FlatList>
            <AddNew navigation={navigation} />
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;