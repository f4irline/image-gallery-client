import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import {
    NavigationStackScreenComponent,
    HeaderProps,
} from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess } from '../../../../store/actions/userActions';
import { selectLoginSuccess } from '../../../../store/reducers/userReducer';

import styles from '../../../../Styles';
import loginStyles from './Login.style';

import Header from '../../../../components/header/Header';
import GalleryButton from '../../../../components/galleryButton/GalleryButton';
import { loginUser } from '../../../../store/actions/userActions';
import withLoading from '../../../../hocs/withLoading/withLoading';

const Login: NavigationStackScreenComponent = props => {
    const { navigation } = props;

    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const success = useSelector(selectLoginSuccess);

    useEffect(() => {
        if (success) {
            navigation.navigate('Profile');
            dispatch(loginSuccess(false));
        }
    }, [success]);

    const login = () => {
        if (!userName.length) {
            return;
        }
        dispatch(loginUser(userName));
    };

    return (
        <SafeAreaView style={[styles.container, loginStyles.loginContainer]}>
            <View style={loginStyles.fieldsWrapper}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                    onChangeText={text => setUserName(text)}
                    value={userName}
                    placeholder="Username"
                    style={styles.textInput}
                />
            </View>
            <GalleryButton
                disabled={!userName.length}
                onPress={login}
                title="Log in"
            />
        </SafeAreaView>
    );
};

Login.navigationOptions = ({ navigation }) => {
    return {
        header: (props: HeaderProps) => (
            <Header headerProps={props} title="Login" />
        ),
    };
};

export default withLoading(Login, true);
