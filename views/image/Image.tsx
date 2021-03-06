import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Entypo as EntypoIcon,
	MaterialIcons as MaterialIcon,
	Ionicons as IonIcon,
} from '@expo/vector-icons';
import {
	Alert,
	Image,
	SafeAreaView,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Platform,
} from 'react-native';
import {
	NavigationStackScreenComponent,
	HeaderProps,
} from 'react-navigation-stack';

import { Image as ImageModel, Comment } from '../../models';

import { selectKeyboardHeight } from '../../store/reducers/preferencesReducer';
import {
	sendComment,
	voteImage,
	deleteImage,
} from '../../store/actions/imagesActions';
import { selectUser } from '../../store/reducers/userReducer';
import { selectImageInView } from '../../store/reducers/imagesReducer';

import styles from '../../Styles';
import getStyles from './Image.style';


import ImageComment from '../../components/comment/Comment';
import Header from '../../components/header/Header';
import withLoading from '../../hocs/withLoading/withLoading';
import withMessages from '../../hocs/withMessages/withMessages';

const ImageView: NavigationStackScreenComponent = props => {
	const { navigation } = props;

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const keyboardHeight = useSelector(selectKeyboardHeight);
	const image = useSelector(selectImageInView);

	const [comment, setComment] = useState('');

	const imageStyles = getStyles({
		width: image?.width,
		height: image?.height,
		noToken: !user || !user.token,
	});

	const sendIcon = Platform.OS === 'ios' ? 'ios-send' : 'md-send';

	useEffect(() => {
		if (!image) {
			navigation.pop();
		}
	}, [image]);

	const addComment = () => {
		if (!user || !user.token) {
			return;
		}

		const userComment: Comment = {
			comment: comment,
			timeStamp: new Date().getTime(),
			imageAuthor: image.author,
			imageTitle: image.name,
			imageId: image.id,
		};

		dispatch(sendComment(userComment, user.token, image));
		setComment('');
	};

	const addVote = (upVote: boolean) => {
		if (!user || !user.token) {
			return;
		}

		dispatch(
			voteImage(
				user.token,
				image,
				upVote,
				(upVote && image.userUpVoted) ||
				(!upVote && image.userDownVoted)
			)
		);
	};

	const removeImage = () => {
		if (!user || !user.token) {
			return;
		}

		Alert.alert(
			'Delete image',
			'Are you sure you want to delete this image?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => dispatch(deleteImage(image, user.token)),
					style: 'destructive',
				},
			]
		);
	};

	return !image ? null : (
		<SafeAreaView style={styles.container}>
			<ScrollView style={imageStyles.scrollContainer}>
				<View style={imageStyles.imageWrapper}>
					<Image
						style={imageStyles.image}
						resizeMode="cover"
						source={{
							uri: `data:image/png;base64,${image.file}`,
						}}></Image>
				</View>
				{!image.description.length ? (
					undefined
				) : (
						<View style={imageStyles.descriptionWrapper}>
							<Text style={imageStyles.descriptionText}>
								{image.description}
							</Text>
						</View>
					)}
				<View style={imageStyles.actionsContainer}>
					<View style={imageStyles.scoreContainer}>
						<TouchableOpacity
							disabled={!user || !user.token}
							onPress={() => addVote(true)}>
							<EntypoIcon
								style={imageStyles.voteButton}
								name={'arrow-bold-up'}
								size={25}
								color={
									image.userUpVoted ? '#09bd00' : '#eeeeee'
								}
							/>
						</TouchableOpacity>
						<Text style={imageStyles.scoreLabel}>
							{image.score}
						</Text>
						<TouchableOpacity
							disabled={!user || !user.token}
							onPress={() => addVote(false)}>
							<EntypoIcon
								style={imageStyles.voteButton}
								name={'arrow-bold-down'}
								size={25}
								color={
									image.userDownVoted ? '#d10000' : '#eeeeee'
								}
							/>
						</TouchableOpacity>
					</View>
					{!image.userCanDelete ? (
						undefined
					) : (
							<TouchableOpacity onPress={() => removeImage()}>
								<MaterialIcon
									name={'delete'}
									size={25}
									color={'#eeeeee'}
								/>
							</TouchableOpacity>
						)}
				</View>
				<View style={imageStyles.commentsContainer}>
					<View style={imageStyles.commentsHeaderContainer}>
						<Text style={imageStyles.commentsHeader}>Comments</Text>
					</View>
					{image.comments.length ? (
						image.comments.map(item => (
							<ImageComment
								key={`comment-${item.id}`}
								comment={item}
							/>
						))
					) : (
							<View style={styles.emptyList}>
								<Text style={styles.emptyListText}>
									No comments yet!
                            </Text>
							</View>
						)}
				</View>
			</ScrollView>
			{!user || !user.token ? (
				undefined
			) : (
					<View
						style={[
							imageStyles.sendWrapper,
							{ bottom: keyboardHeight },
						]}>
						<TextInput
							value={comment}
							onChangeText={text => setComment(text)}
							style={[styles.textInput, imageStyles.commentInput]}
							placeholder="Add a comment"
						/>
						<TouchableOpacity onPress={addComment}>
							<IonIcon
								style={imageStyles.sendIcon}
								name={sendIcon}
								size={25}
								color={'#eeeeee'}
							/>
						</TouchableOpacity>
					</View>
				)}
		</SafeAreaView>
	);
};

ImageView.navigationOptions = ({ navigation }) => {
	const image = navigation.getParam('image') as ImageModel;
	return {
		header: (props: HeaderProps) => (
			<Header
				headerProps={props}
				title={image.name}
				subtitle={`By: ${image.author}`}
			/>
		),
	};
};

export default withMessages(withLoading(ImageView));
