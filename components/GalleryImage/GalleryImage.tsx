import React from 'react';
import { Dimensions, Image, View, Text } from 'react-native';

import getStyles from './GalleryImage.style';

import { PlaceholderImage } from '../../models/PlaceholderImage';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    navigation: NavigationStackProp;
    image: PlaceholderImage;
}

const GalleryImage: React.FC<Props> = (props: Props) => {
    const { height, width } = Dimensions.get('window');
    const { navigation, image} = props;
    const imageStyles = getStyles({ height: height, width: width });

    return (
        <View style={imageStyles.imageWrapper}>
            <View style={imageStyles.infoWrapper}>
                <Text style={imageStyles.description}>{props.image.description}</Text>
            </View>
            <View style={imageStyles.touchableWrapper}>
                <TouchableOpacity style={imageStyles.touchable} onPress={() => navigation.navigate('Image', { image: image })}>
                    <Image style={imageStyles.image} source={{uri: image.download_url}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GalleryImage;