import React, { useState } from 'react';
import { SafeAreaView, Text, View, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { selectImages } from '../../store/reducers/imagesReducer';
import { selectUser } from '../../store/reducers/userReducer';

import styles from '../../Styles';
import profileStyles from './Profile.style';

import Auth from './auth/Auth';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import TabButton from '../../components/tabButton/TabButton';
import GalleryImage from '../../components/galleryImage/GalleryImage';

enum SelectedTab {
    IMAGES = 'Images',
    COMMENTS = 'Comments',
}

const Profile: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const user = useSelector(selectUser);
    const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.IMAGES);

    const images = useSelector(selectImages);

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