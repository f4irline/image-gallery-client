import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons as MaterialIcon } from '@expo/vector-icons';

import commentStyles from './Comment.style';

import { Comment } from '../../models';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    comment: Comment
}

const ImageComment: React.FC<Props> = (props: Props) => {
    const { comment } = props;
    return (
        <View style={commentStyles.container}>
            <View style={commentStyles.commentWrapper}>
                <Text style={commentStyles.author}>{comment.author}</Text>
                <Text style={commentStyles.comment}>{comment.comment}</Text>
            </View>
            { !comment.userCanDelete ? undefined : 
                <TouchableOpacity>
                    <MaterialIcon name={'delete'} size={25} color={'#eeeeee'} /> 
                </TouchableOpacity>
            }
        </View>
    )
}

export default ImageComment;