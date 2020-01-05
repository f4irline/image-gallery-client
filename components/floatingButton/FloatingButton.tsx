import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/userReducer';

interface Props {
    navigation: NavigationStackProp;
}

const FloatingButton: React.FC<Props> = (props: Props) => {
    const { navigation } = props;
    const user = useSelector(selectUser);

    const actions = [
        {
            textBackground: '#eeeeee',
            color: '#2d4059',
            text: 'Camera',
            name: 'upload_camera',
            icon: require('../../assets/icons/camera_add_icon.png'),
            position: 2,
        },
        {
            textBackground: '#eeeeee',
            color: '#2d4059',
            text: 'Gallery',
            name: 'upload_gallery',
            icon: require('../../assets/icons/gallery_add_icon.png'),
            position: 1,
        },
    ];

    const floatingItemClicked = (item: string) => {
        switch (item) {
            case 'upload_gallery':
                promptGalleryPermissions();
                break;
            default:
                promptCameraPermissions();
                break;
        }
    };

    const promptGalleryPermissions = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status === 'granted') {
                pickFromGallery();
                return;
            }
        }
        pickFromGallery();
    };

    const promptCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            pickFromCamera();
        }
    };

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
            base64: true,
        });

        if (result.cancelled) {
            return;
        }

        navigation.navigate('Upload', { image: result });
    };

    const pickFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.9,
            base64: true,
        });

        if (result.cancelled) {
            return;
        }

        navigation.navigate('Upload', { image: result });
    };

    return user && user.token ? (
        <FloatingAction
            color={'#222831'}
            distanceToEdge={10}
            actions={actions}
            onPressItem={floatingItemClicked}
        />
    ) : null;
};

export default FloatingButton;
