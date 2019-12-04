import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectImages } from '../../store/reducers/imagesReducer';
import { ImagesActionTypes } from '../../store/actions/imagesActions';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList } from 'react-native';

import api from '../../utils/api/Api';
import styles from '../../Styles';
import nearStyles from './Near.style';

import GalleryImage from '../../components/galleryImage/GalleryImage';
import { PlaceholderImage } from '../../models/PlaceholderImage';
import FloatingButton from '../../components/floatingButton/FloatingButton';

const Near: NavigationStackScreenComponent = (props) => {
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
                upVoted: index % 2 === 0,
                downVoted: index % 3 === 0 && index % 2 !== 0,
                canDelete: index % 2 === 0,
                comments: [
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 0
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 1
                    },
                    {
                        author: 'AnotherOne',
                        userCanDelete: false,
                        comment: 'So cool.',
                        id: 2
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 3
                    }
                ]
            }))
            dispatch({
                type: ImagesActionTypes.SetImages,
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
                style={nearStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage navigation={navigation} image={ item }/>}>
            </FlatList>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    )
}

Near.navigationOptions = {
    headerShown: false
}

export default Near;