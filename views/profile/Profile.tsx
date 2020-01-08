import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from '../../store/reducers/userReducer';

import styles from '../../Styles';
import profileStyles from './Profile.style';

import Auth from './auth/Auth';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import TabButton from '../../components/tabButton/TabButton';
import { logoutUser, loadUserComments } from '../../store/actions/userActions';
import { loadUserImages } from '../../store/actions/imagesActions';
import ProfileImageList from '../../components/profileImageList/profileImageList';
import ProfileCommentList from '../../components/profileCommentList/profileCommentList';
import withLoading from '../../hocs/withLoading/withLoading';
import withMessages from '../../hocs/withMessages/withMessages';

enum SelectedTab {
    IMAGES = 'Images',
    COMMENTS = 'Comments',
}

const Profile: NavigationStackScreenComponent = props => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const [selectedTab, setSelectedTab] = useState<SelectedTab>(
        SelectedTab.IMAGES
    );

    const logout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        if (!user || !user.token) {
            return;
        }
        dispatch(loadUserImages(user.token));
        dispatch(loadUserComments(user.token));
    }, [user]);

    return user ? (
        <SafeAreaView
            style={[styles.viewContainer, profileStyles.profileContainer]}>
            <View style={profileStyles.headerContainer}>
                <View style={profileStyles.helloContainer}>
                    <Text style={profileStyles.greeting}>Hello,</Text>
                    <Text style={profileStyles.name}>{user.name}!</Text>
                </View>
                <View>
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
                <ProfileImageList navigation={navigation} />
            ) : (
                <ProfileCommentList />
            )}
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    ) : (
        <Auth navigation={navigation} />
    );
};

Profile.navigationOptions = {
    headerShown: false,
};

export default withMessages(withLoading(Profile, true));
