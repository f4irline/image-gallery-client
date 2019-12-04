import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import { ImagesActionTypes } from '../../store/actions/imagesActions';
import { selectImages } from '../../store/reducers/imagesReducer';
import { selectUser } from '../../store/reducers/userReducer';

import styles from '../../Styles';
import profileStyles from './Profile.style';

import Auth from './auth/Auth';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import TabButton from '../../components/tabButton/TabButton';
import GalleryImage from '../../components/galleryImage/GalleryImage';

import api from '../../utils/api/Api';

import { PlaceholderImage } from '../../models/PlaceholderImage';

enum SelectedTab {
    IMAGES = 'Images',
    COMMENTS = 'Comments',
}

const Profile: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const user = useSelector(selectUser);
    const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.IMAGES);

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

    return user ? (
        <SafeAreaView style={[styles.viewContainer, profileStyles.profileContainer]}>
            <View style={profileStyles.headerContainer}>
                <Text style={profileStyles.greeting}>Hello,</Text>
                <Text style={profileStyles.name}>{user.name}!</Text>
            </View>
            <View style={profileStyles.tabsContainer}>
                <TabButton 
                    onClick={() => setSelectedTab(SelectedTab.IMAGES)} 
                    label={SelectedTab.IMAGES}
                    isSelected={selectedTab === SelectedTab.IMAGES}/>
                <TabButton 
                    onClick={() => setSelectedTab(SelectedTab.COMMENTS)} 
                    label={SelectedTab.COMMENTS}
                    isSelected={selectedTab === SelectedTab.COMMENTS}/>
            </View>
            { selectedTab === SelectedTab.IMAGES ? 
                <FlatList
                    numColumns={2}
                    style={profileStyles.imageList}
                    keyExtractor={item => `image-${item.id}`}
                    data={images} 
                    renderItem={({ item }) => <GalleryImage navigation={navigation} image={ item }/>}>
                </FlatList> : null }
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    ) : <Auth navigation={navigation} />;
}

Profile.navigationOptions = {
    headerShown: false
}

export default Profile;