import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import styles from '../../Styles';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/userReducer';
import Auth from './auth/Auth';

const Profile: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const user = useSelector(selectUser);

    return user ? (
        <SafeAreaView style={styles.viewContainer}>
            <Text>Profile</Text>
            <View>

            </View>
            <FloatingButton navigation={navigation} />
        </SafeAreaView>
    ) : <Auth navigation={navigation} />;
}

Profile.navigationOptions = {
    headerShown: false
}

export default Profile;