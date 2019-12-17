import React, { useState } from 'react';
import { SafeAreaView, Image, View, TextInput, ScrollView } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import getStyles from './Upload.style';
import styles from '../../Styles';

import { UserImage } from '../../models';

import Header from '../../components/header/Header';
import GalleryButton from '../../components/galleryButton/GalleryButton';
import { uploadImage } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';

const Upload: NavigationStackScreenComponent = (props) => {
    const dispatch = useDispatch();

    const { navigation } = props;
    const [image] = useState<UserImage>(navigation.getParam('image'));
    const [title, setTitle] = useState('');
    
    const user = useSelector(selectUser);

    const uploadStyles = getStyles({ width: image.width, height: image.height })

    const submitImage = async () => {
        if (!user || !user.token) { return; }

        const data = new FormData();

        data.append('file', image.base64);
        data.append('properties', new Blob([JSON.stringify({
            'name': title,
            'description': title,
        })], {
            type: 'application/json'
        }));
        
        dispatch(uploadImage(data, user.token));
    }

    return (
        <SafeAreaView style={[styles.container, uploadStyles.uploadContainer]}>
            <ScrollView>
                <View style={uploadStyles.imageWrapper}>
                    <Image
                        style={uploadStyles.image} 
                        resizeMode='cover'
                        source={{uri: image.uri}} />
                </View>
                <View style={uploadStyles.fieldsWrapper}>
                    <TextInput
                        onChangeText={text => setTitle(text)}
                        value={title}
                        style={[styles.textInput, uploadStyles.titleField]}
                        placeholder='Image title' />
                    <GalleryButton onPress={submitImage} title='Submit' />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

Upload.navigationOptions = () => {
    return {
        header: (props: HeaderProps) => <Header headerProps={props} title={'Upload image'} />
    }
}

export default Upload;