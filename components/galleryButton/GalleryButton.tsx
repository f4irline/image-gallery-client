import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import galleryButtonStyle from './GalleryButton.style';

interface Props {
    title: string;
    disabled?: boolean;
    onPress: () => void;
}

const GalleryButton: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={[galleryButtonStyle.buttonContainer, props.disabled ? galleryButtonStyle.disabled : undefined]}>
            <Text style={galleryButtonStyle.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default GalleryButton;