import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, View, TextInput, ScrollView, Platform } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import getStyles from './Upload.style';
import styles from '../../Styles';

import { UserImage } from '../../models';

import Header from '../../components/header/Header';
import GalleryButton from '../../components/galleryButton/GalleryButton';
import { uploadImage, ImagesActionTypes } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';
import { selectUploadSuccess } from '../../store/reducers/imagesReducer';

const Upload: NavigationStackScreenComponent = (props) => {
    const dispatch = useDispatch();

    const { navigation } = props;
    const [image] = useState<UserImage>(navigation.getParam('image'));
    const [title, setTitle] = useState('');
    
    const user = useSelector(selectUser);
    const uploadSuccess = useSelector(selectUploadSuccess);

    const uploadStyles = getStyles({ width: image.width, height: image.height })

    const submitImage = async () => {
        if (!user || !user.token) { return; }

        const data = new FormData();

        const img = {
            uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
            name: `${title}.jpg`,
            type: 'image/jpeg'
        }

        data.append('file', img as any);
        data.append('name', title),
        data.append('description', title);
        
        dispatch(uploadImage(data, user.token));
    }

    useEffect(() => {
        if (uploadSuccess) {
            navigation.pop();
            dispatch({
                type: ImagesActionTypes.SetUploadSuccess,
                payload: { success: false }
            });
        }
    }, [uploadSuccess])

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