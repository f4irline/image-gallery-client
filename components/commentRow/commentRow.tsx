import React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import {
	AntDesign as AntIcon,
	MaterialIcons as MaterialIcon,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { loadImage } from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';
import { deleteComment } from '../../store/actions/userActions';

import commentRowStyles from './commentRow.style';

import { Comment } from '../../models';

interface Props {
	comment: Comment;
	odd: boolean;
}

const CommentRow: React.FC<Props> = (props: Props) => {
	const { comment, odd } = props;

	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const formatDate = (date: Date) => {
		return format(date, 'dd.MM.yyyy HH:mm');
	};

	const goToImage = () => {
		dispatch(
			loadImage(
				comment.imageId,
				user && user.token ? user.token : undefined
			)
		);
	};

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
		<View
			style={[
				commentRowStyles.wrapper,
				odd ? commentRowStyles.wrapperOdd : undefined,
			]}>
			<View style={commentRowStyles.commentInfoWrapper}>
				<View style={commentRowStyles.imageInfoWrapper}>
					<Text
						style={[
							commentRowStyles.commentInfo,
							commentRowStyles.imageTitle,
						]}>
						{comment.imageTitle}
					</Text>
					<Text
						style={[
							commentRowStyles.commentInfo,
							commentRowStyles.imageAuthor,
						]}>
						By: {comment.imageAuthor}
					</Text>
				</View>
				<Text style={commentRowStyles.commentInfo}>
					{comment.comment}
				</Text>
				<View style={commentRowStyles.dateWrapper}>
					<Text
						style={[
							commentRowStyles.commentInfo,
							commentRowStyles.date,
						]}>
						{formatDate(new Date(comment.timeStamp))}
					</Text>
				</View>
			</View>
			<View style={commentRowStyles.actionsWrapper}>
				<TouchableOpacity
					onPress={goToImage}
					style={commentRowStyles.enterWrapper}>
					<AntIcon size={25} name={'enter'} color={'#eeeeee'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={removeComment}>
					<MaterialIcon name={'delete'} size={25} color={'#eeeeee'} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CommentRow;
