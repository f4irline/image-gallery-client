import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const Profile: NavigationStackScreenComponent = () => {
    return (
        <SafeAreaView style={styles.viewContainer}>
            <Text>Profile</Text>
        </SafeAreaView>
    )
}

Profile.navigationOptions = {
    headerShown: false
}

export default Profile;