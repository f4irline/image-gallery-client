import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import styles from '../../../Styles';
import authStyles from './Auth.style';
import GalleryButton from '../../../components/galleryButton/GalleryButton';

interface Props {
    navigation: NavigationStackProp;
}

const Auth: React.FC<Props> = (props: Props) => {
    const { navigation } = props;

    return (
        <SafeAreaView style={[styles.viewContainer, authStyles.authContainer]}>
            <View style={authStyles.headerContainer}>
                <Text style={authStyles.title}>Sign up or log in</Text>
                <Text style={authStyles.subtitle}>Sign up or login to add images, comment on images and view your own images</Text>
            </View>
            <GalleryButton onPress={() => navigation.navigate('Login')} title='Log in' />
        </SafeAreaView>
    )
}

export default Auth;