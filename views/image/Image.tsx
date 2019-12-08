import React, { useState } from 'react';
import { Entypo as EntypoIcon, MaterialIcons as MaterialIcon, Ionicons as IonIcon } from '@expo/vector-icons';
import { Image, SafeAreaView, Text, View, ScrollView, TextInput, Platform } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';

import styles from '../../Styles';
import getStyles from './Image.style';

import { PlaceholderImage } from '../../models';

import ImageComment from '../../components/comment/Comment';
import Header from '../../components/header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectKeyboardHeight } from '../../store/reducers/preferencesReducer';

const ImageView: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const [image] = useState<PlaceholderImage>(navigation.getParam('image'));
    const keyboardHeight = useSelector(selectKeyboardHeight);
    const imageStyles = getStyles({ width: image.width, height: image.height })

    const sendIcon = Platform.OS === 'ios'
        ? 'ios-send'
        : 'md-send';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={imageStyles.scrollContainer}>
                <View style={imageStyles.imageWrapper}>
                    <Image 
                        style={imageStyles.image} 
                        resizeMode='cover'
                        source={{uri: image.download_url}}>
                    </Image>
                </View>
                <View style={imageStyles.actionsContainer}>
                    <View style={imageStyles.scoreContainer}>
                        <TouchableOpacity>
                            <EntypoIcon name={'arrow-bold-up'} size={25} color={image.upVoted ? '#09bd00' : '#eeeeee'} />
                        </TouchableOpacity>
                        <Text style={imageStyles.scoreLabel}>0</Text>
                        <TouchableOpacity>
                            <EntypoIcon name={'arrow-bold-down'} size={25} color={image.downVoted ? '#d10000' : '#eeeeee'} />
                        </TouchableOpacity>
                    </View>
                    { !image.canDelete ? undefined : 
                        <TouchableOpacity>
                            <MaterialIcon name={'delete'} size={25} color={'#eeeeee'} /> 
                        </TouchableOpacity>
                    }
                </View>
                <View style={imageStyles.commentsContainer}>
                    <View style={imageStyles.commentsHeaderContainer}>
                        <Text style={imageStyles.commentsHeader}>Comments</Text>
                    </View>
                    { image.comments.map(item => <ImageComment key={item.id} comment={item} />) }
                </View>
            </ScrollView>
            <View style={[imageStyles.sendWrapper, { bottom: keyboardHeight }]}>
                <TextInput style={[styles.textInput, imageStyles.commentInput]} placeholder="Add a comment" />
                <TouchableOpacity>
                    <IonIcon style={imageStyles.sendIcon} name={sendIcon} size={25} color={'#eeeeee'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

ImageView.navigationOptions = ({navigation}) => {
    const image = navigation.getParam('image') as PlaceholderImage;
    return {
        header: (props: HeaderProps) => <Header headerProps={props} title={image.description} subtitle={`By: ${image.author}`} />
    }
}

export default ImageView;