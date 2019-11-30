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
import { PlaceholderImage } from '../../models/PlaceholderImage';

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
            const imagesData: PlaceholderImage[] = images.data;
            const mappedImages: PlaceholderImage[] = imagesData.map((img: PlaceholderImage, index: number) => ({
                ...img,
                description: 'Test description. This is a placeholder image with test description.',
                comments: [
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: index
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: index
                    },
                    {
                        author: 'AnotherOne',
                        userCanDelete: false,
                        comment: 'So cool.',
                        id: index
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: index
                    }
                ]
            }))
            dispatch({
                type: imagesActionTypes.SET_IMAGES,
                payload: mappedImages
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