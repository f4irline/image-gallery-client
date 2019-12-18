import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo as EntypoIcon, MaterialIcons as MaterialIcon, Ionicons as IonIcon } from '@expo/vector-icons';
import { Image, SafeAreaView, Text, View, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';

import { selectKeyboardHeight } from '../../store/reducers/preferencesReducer';

import styles from '../../Styles';
import getStyles from './Image.style';

import { Image as ImageModel, Comment } from '../../models';

import ImageComment from '../../components/comment/Comment';
import Header from '../../components/header/Header';
import { sendComment } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';

const ImageView: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const keyboardHeight = useSelector(selectKeyboardHeight);

    const [image] = useState<ImageModel>(navigation.getParam('image'));

    const [comment, setComment] = useState('');

    const imageStyles = getStyles({ width: image.width, height: image.height })

    const sendIcon = Platform.OS === 'ios'
        ? 'ios-send'
        : 'md-send';

    const addComment = () => {
        if (!user || !user.token) { return; }

        const userComment: Comment = {
            comment: comment,
        }

        dispatch(sendComment(userComment, user.token, image))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={imageStyles.scrollContainer}>
                <View style={imageStyles.imageWrapper}>
                    <Image 
                        style={imageStyles.image} 
                        resizeMode='cover'
                        source={{uri: `data:image/png;base64,${image.file}`}}>
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
                    { image.comments.map(item => <ImageComment key={item.commentId} comment={item} />) }
                </View>
            </ScrollView>
            <View style={[imageStyles.sendWrapper, { bottom: keyboardHeight }]}>
                <TextInput onChangeText={text => setComment(text)} style={[styles.textInput, imageStyles.commentInput]} placeholder="Add a comment" />
                <TouchableOpacity onPress={addComment}>
                    <IonIcon style={imageStyles.sendIcon} name={sendIcon} size={25} color={'#eeeeee'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

ImageView.navigationOptions = ({navigation}) => {
    const image = navigation.getParam('image') as ImageModel;
    return {
        header: (props: HeaderProps) => <Header headerProps={props} title={image.description} subtitle={`By: ${image.author}`} />
    }
}

export default ImageView;