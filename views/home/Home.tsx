import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { imagesActionTypes } from '../../store/actions/imagesActions';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { SafeAreaView, Text, ScrollView, FlatList, View } from 'react-native';

import api from '../../utils/api/Api';
import styles from '../../Styles';
import homeStyles from './Home.style';

import GalleryImage from '../../components/GalleryImage/GalleryImage';

interface Props extends NavigationStackScreenProps {}

const Home: NavigationStackScreenComponent<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const images = useSelector((state: State) => state.imagesState.images);

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
        <SafeAreaView style={styles.container}>
            <FlatList
                numColumns={2}
                style={homeStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage image={ item }/>}>
            </FlatList>
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;