import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import galleryButtonStyle from './GalleryButton.style';

interface Props {
    title: string;
    onPress: () => void;
}

const GalleryButton: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={galleryButtonStyle.buttonContainer}>
            <Text style={galleryButtonStyle.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default GalleryButton;