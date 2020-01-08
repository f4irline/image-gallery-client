import React from 'react';
import { Alert, View, Text } from 'react-native';
import { MaterialIcons as MaterialIcon } from '@expo/vector-icons';

import commentStyles from './Comment.style';

import { Comment } from '../../models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/userReducer';
import { deleteComment } from '../../store/actions/imagesActions';

interface Props {
    comment: Comment;
}

const ImageComment: React.FC<Props> = (props: Props) => {
    const { comment } = props;
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const removeComment = () => {
        if (!user || !user.token) {
            return;
        }

        Alert.alert(
            'Delete comment',
            'Are you sure you want to delete this comment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => dispatch(deleteComment(comment, user.token)),
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={commentStyles.container}>
            <View style={commentStyles.commentWrapper}>
                <Text style={commentStyles.author}>{comment.author}</Text>
                <Text style={commentStyles.comment}>{comment.comment}</Text>
            </View>
            {!comment.userCanDelete ? (
                undefined
            ) : (
                <TouchableOpacity onPress={removeComment}>
                    <MaterialIcon name={'delete'} size={25} color={'#eeeeee'} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ImageComment;
