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
                <Text style={authStyles.title}>Sign up</Text>
                <Text style={authStyles.subtitle}>
                    Sign up to add images, comment on images and view your own
                    images. Sign up is one-time-only and if you log out your
                    personal user data is lost.
                </Text>
            </View>
            <GalleryButton
                onPress={() => navigation.navigate('Login')}
                title="Sign up"
            />
        </SafeAreaView>
    );
};

export default Auth;
