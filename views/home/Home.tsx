import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingAction } from 'react-native-floating-action';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { SafeAreaView, FlatList } from 'react-native';

import { selectImages } from '../../store/reducers/imagesReducer';
import { imagesActionTypes } from '../../store/actions/imagesActions';

import api from '../../utils/api/Api';
import styles from '../../Styles';
import homeStyles from './Home.style';

import GalleryImage from '../../components/GalleryImage/GalleryImage';
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
                type: imagesActionTypes.SET_IMAGES,
                payload: mappedImages
            })
        } catch (err) {
            console.log(err);
        }
    }

    const actions = [
        {
            textBackground: '#eeeeee',
            color: '#2d4059',
            text: 'Camera',
            name: 'upload_camera',
            icon: require('../../assets/icons/camera_add_icon.png'),
            position: 2
        },
        {
            textBackground: '#eeeeee',
            color: '#2d4059',
            text: 'Gallery',
            name: 'upload_gallery',
            icon: require('../../assets/icons/gallery_add_icon.png'),
            position: 1
        }
    ];

    return (
        <SafeAreaView style={styles.viewContainer}>
            <FlatList
                numColumns={2}
                style={homeStyles.imageList}
                keyExtractor={item => `image-${item.id}`}
                data={images} 
                renderItem={({ item }) => <GalleryImage navigation={navigation} image={ item }/>}>
            </FlatList>
            <FloatingAction
                color={'#222831'}
                distanceToEdge={10}
                actions={actions}
                />
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;