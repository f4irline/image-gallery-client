import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { imagesActionTypes } from '../../store/actions/imagesActions';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { SafeAreaView, Text } from 'react-native';

import api from '../../utils/api/Api';

import styles from '../../Styles';

interface Props extends NavigationStackScreenProps {}

const Home: NavigationStackScreenComponent<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const images = useSelector((state: State) => state.imagesState);

    useEffect(() => {
        fetchImages();
    }, [])

    useEffect(() => {
        console.log(images);
    }, [images])

    const fetchImages = async () => {
        try {
            const images = await api.get('/image/');
            dispatch({
                type: imagesActionTypes.SET_IMAGES,
                payload: images.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;