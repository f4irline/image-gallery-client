import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

const Profile: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.viewContainer}>
            <Text>Profile</Text>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    )
}

Profile.navigationOptions = {
    headerShown: false
}

export default Profile;