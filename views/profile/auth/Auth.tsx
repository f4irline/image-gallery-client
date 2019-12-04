import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

import styles from '../../../Styles';
import authStyles from './Auth.style';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
    navigation: NavigationStackProp;
}

const Auth: React.FC<Props> = (props: Props) => {
    return (
        <SafeAreaView style={[styles.viewContainer, authStyles.authContainer]}>
            <View style={authStyles.headerContainer}>
                <Text style={authStyles.title}>Sign up</Text>
                <Text style={authStyles.subtitle}>Sign up to add images, comment on images and view your own images</Text>
            </View>
            <Button color='#ff5722' onPress={undefined} title='Sign up' />
        </SafeAreaView>
    )
}

export default Auth;