import React, { useState } from 'react';
import { SafeAreaView, Image, View, TextInput, Button, ScrollView } from 'react-native';

import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';

import Header from '../../components/header/Header';
import getStyles from './Upload.style';
import styles from '../../Styles';

interface UserImage {
    cancelled: boolean;
    height: number;
    width: number;
    uri: string;
    base64: string;
}

const Upload: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const [image] = useState<UserImage>(navigation.getParam('image'));
    const [title, setTitle] = useState('');

    const uploadStyles = getStyles({ width: image.width, height: image.height })

    const submitImage = async () => {
        console.log('submit');
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
                        multiline={true}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        style={[styles.textInput, uploadStyles.titleField]}
                        placeholder='Image title' />
                    <Button color='#ff5722' onPress={submitImage} title='Submit' />
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