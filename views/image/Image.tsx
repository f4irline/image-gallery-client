import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import styles from '../../Styles';
import imageStyles from './Image.style';

import AddNew from '../../components/AddNew/AddNew';
import { PlaceholderImage } from '../../models/PlaceholderImage';

interface Props {
    navigation: NavigationStackProp;
}

const ImageView: React.FC<Props> = (props: Props) => {
    const { navigation } = props;
    const [image] = useState<PlaceholderImage>(navigation.getParam('image'));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={imageStyles.scrollContainer}>
                <View style={imageStyles.infoContainer}>
                    <Text style={imageStyles.header}>{image.author}</Text>
                </View>
                <Image 
                    style={{...imageStyles.image, height: undefined, width: '100%', aspectRatio: image.width/image.height}} 
                    resizeMode='cover'
                    source={{uri: image.download_url}}></Image>
            </ScrollView>
            <AddNew />
        </SafeAreaView>
    )
}

export default ImageView;