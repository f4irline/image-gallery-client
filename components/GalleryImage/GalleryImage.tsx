import React from 'react';
import { Dimensions, Image, View, ImageStyle } from 'react-native';

import getStyles from './GalleryImage.style';

import { PlaceholderImage } from '../../models/PlaceholderImage';

interface Props {
    image: PlaceholderImage
}

const GalleryImage: React.FC<Props> = (props: Props) => {
    const { height, width } = Dimensions.get('window');
    const imageStyles = getStyles({ height: height, width: width });

    return (
        <View style={imageStyles.imageWrapper}>
            <Image style={imageStyles.image} resizeMode='cover' source={{ uri: props.image.download_url }}/>
        </View>
    )
}

export default GalleryImage;