import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import { UserActionTypes } from '../../../../store/actions/userActions';

import styles from '../../../../Styles';
import loginStyles from './Login.style';

import Header from '../../../../components/header/Header';
import GalleryButton from '../../../../components/galleryButton/GalleryButton';

const Login: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;

    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const login = () => {
        if (!userName.length) { return; }
        dispatch({
            type: UserActionTypes.SetUser,
            payload: userName,
        });
        
        navigation.navigate('Profile');
    }

    return (
        <SafeAreaView style={[styles.container, loginStyles.loginContainer]}>
            <View style={loginStyles.fieldsWrapper}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput onChangeText={(text) => setUserName(text)} value={userName} placeholder='Username' style={styles.textInput}/>
            </View>
            <GalleryButton onPress={login} title='Log in'/>
        </SafeAreaView>
    )
}

Login.navigationOptions = ({navigation}) => {
    return {
        header: (props: HeaderProps) => <Header headerProps={props} title='Login' />
    }
}

export default Login;