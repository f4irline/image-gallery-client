import React, { useEffect } from 'react';
import { Dimensions, Image, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import getStyles from './GalleryImage.style';

import { Image as ImageModel } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { loadImage } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';
import { selectImageInView } from '../../store/reducers/imagesReducer';

interface Props {
    navigation: NavigationStackProp;
    image: ImageModel;
    padding?: number | 0;
    spacing?: number | 0;
    borderWidth?: number | 0;
    description?: boolean;
}

const GalleryImage: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const imageInView = useSelector(selectImageInView);

    const { height, width } = Dimensions.get('window');
    const { image, navigation } = props;
    const imageStyles = getStyles({ screenHeight: height, screenWidth: width });

    useEffect(() => {
        if (imageInView) {
            navigation.navigate('Image', { image: imageInView });
        }
    }, [imageInView])

    const setImageToView = () => {
        dispatch(loadImage(image, user && user.token ? user.token : undefined));
    }

    return (
        <View style={[imageStyles.imageWrapper, { padding: props.padding, margin: props.spacing, borderWidth: props.borderWidth }]} >
            { props.description ?
                <View style={imageStyles.infoWrapper}>
                    <Text style={imageStyles.description}>{props.image.description}</Text>
                </View> : null }
            <View style={imageStyles.touchableWrapper}>
                <TouchableOpacity style={imageStyles.touchable} onPress={setImageToView}>
                    <Image style={imageStyles.image} source={{uri: `data:image/png;base64,${image.file}`}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GalleryImage;