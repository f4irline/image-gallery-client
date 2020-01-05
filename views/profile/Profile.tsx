import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectUserImages,
    selectRefreshingUserImages,
} from '../../store/reducers/imagesReducer';
import { selectUser } from '../../store/reducers/userReducer';

import styles from '../../Styles';
import profileStyles from './Profile.style';

import Auth from './auth/Auth';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import TabButton from '../../components/tabButton/TabButton';
import GalleryImage from '../../components/galleryImage/GalleryImage';
import { UserActionTypes, logoutUser } from '../../store/actions/userActions';
import { loadUserImages } from '../../store/actions/imagesActions';

enum SelectedTab {
    IMAGES = 'Images',
    COMMENTS = 'Comments',
}

const Profile: NavigationStackScreenComponent = props => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const refreshing = useSelector(selectRefreshingUserImages);
    const [selectedTab, setSelectedTab] = useState<SelectedTab>(
        SelectedTab.IMAGES
    );

    const images = useSelector(selectUserImages);

    const logout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        if (!user || !user.token) {
            return;
        }
        dispatch(loadUserImages(user.token));
    }, [user]);

    const refreshImages = () => {
        dispatch(loadUserImages(user.token));
    };

    return user ? (
        <SafeAreaView
            style={[styles.viewContainer, profileStyles.profileContainer]}>
            <View style={profileStyles.headerContainer}>
                <View style={profileStyles.helloContainer}>
                    <Text style={profileStyles.greeting}>Hello,</Text>
                    <Text style={profileStyles.name}>{user.name}!</Text>
                </View>
                <View style={profileStyles.logoutContainer}>
                    <TouchableOpacity onPress={logout}>
                        <Text style={profileStyles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={profileStyles.tabsContainer}>
                <TabButton
                    onClick={() => setSelectedTab(SelectedTab.IMAGES)}
                    label={SelectedTab.IMAGES}
                    isSelected={selectedTab === SelectedTab.IMAGES}
                />
                <TabButton
                    onClick={() => setSelectedTab(SelectedTab.COMMENTS)}
                    label={SelectedTab.COMMENTS}
                    isSelected={selectedTab === SelectedTab.COMMENTS}
                />
            </View>
            {selectedTab === SelectedTab.IMAGES ? (
                <FlatList
                    numColumns={2}
                    style={profileStyles.imageList}
                    keyExtractor={item => `image-${item.id}`}
                    data={images}
                    renderItem={({ item }) => (
                        <GalleryImage navigation={navigation} image={item} />
                    )}
                    refreshControl={
                        <RefreshControl
                            onRefresh={refreshImages}
                            refreshing={refreshing}
                        />
                    }></FlatList>
            ) : null}
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    ) : (
        <Auth navigation={navigation} />
    );
};

Profile.navigationOptions = {
    headerShown: false,
};

export default Profile;
