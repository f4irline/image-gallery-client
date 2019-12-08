import React from 'react';
import { Dimensions, Image, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import getStyles from './GalleryImage.style';

import { PlaceholderImage } from '../../models';

interface Props {
    navigation: NavigationStackProp;
    image: PlaceholderImage;
    padding?: number | 0;
    spacing?: number | 0;
    borderWidth?: number | 0;
    description?: boolean;
}

const GalleryImage: React.FC<Props> = (props: Props) => {
    const { height, width } = Dimensions.get('window');
    const { navigation, image} = props;
    const imageStyles = getStyles({ height: height, width: width });

    return (
        <View style={[imageStyles.imageWrapper, { padding: props.padding, margin: props.spacing, borderWidth: props.borderWidth }]} >
            { props.description ?
                <View style={imageStyles.infoWrapper}>
                    <Text style={imageStyles.description}>{props.image.description}</Text>
                </View> : null }
            <View style={imageStyles.touchableWrapper}>
                <TouchableOpacity style={imageStyles.touchable} onPress={() => navigation.navigate('Image', { image: image })}>
                    <Image style={imageStyles.image} source={{uri: image.download_url}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GalleryImage;