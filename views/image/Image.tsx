import React, { useState } from 'react';
import { Entypo as EntypoIcon, MaterialIcons as MaterialIcon } from '@expo/vector-icons';
import { Image, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent, HeaderProps } from 'react-navigation-stack';

import styles from '../../Styles';
import getStyles from './Image.style';

import { PlaceholderImage } from '../../models/PlaceholderImage';

import ImageComment from '../../components/comment/Comment';
import Header from '../../components/header/Header';

const ImageView: NavigationStackScreenComponent = (props) => {
    const { navigation } = props;
    const [image] = useState<PlaceholderImage>(navigation.getParam('image'));
    const imageStyles = getStyles({ width: image.width, height: image.height })

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
                        <EntypoIcon name={'arrow-bold-up'} size={25} color={image.upVoted ? '#09bd00' : '#eeeeee'} />
                        <Text style={imageStyles.scoreLabel}>0</Text>
                        <EntypoIcon name={'arrow-bold-down'} size={25} color={image.downVoted ? '#d10000' : '#eeeeee'} />
                    </View>
                    { image.canDelete ? <MaterialIcon name={'delete'} size={25} color={'#eeeeee'} /> : undefined }
                </View>
                <View style={imageStyles.commentsContainer}>
                    <View style={imageStyles.commentsHeaderContainer}>
                        <Text style={imageStyles.commentsHeader}>Comments</Text>
                    </View>
                    { image.comments.map(item => <ImageComment key={item.id} comment={item} />) }
                </View>
            </ScrollView>
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