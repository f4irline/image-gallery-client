import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import AddNew from '../../components/AddNew/AddNew';
import { NavigationStackProp } from 'react-navigation-stack';
import { PlaceholderImage } from '../../models/PlaceholderImage';

interface Props {
    navigation: NavigationStackProp;
}

const ImageView: React.FC<Props> = (props: Props) => {
    const { navigation } = props;
    const [image, setImage] = useState<PlaceholderImage>(navigation.getParam('image'));

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{uri: image.download_url}}></Image>
            <AddNew />
        </SafeAreaView>
    )
}

export default ImageView;