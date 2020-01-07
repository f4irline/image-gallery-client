import React from 'react';
import { RefreshControl, FlatList } from 'react-native';
import GalleryImage from '../galleryImage/GalleryImage';

import commentListStyles from './profileCommentList.style';
import { Image, User, Comment } from '../../models';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectRefreshingUserImages,
    selectUserImages,
} from '../../store/reducers/imagesReducer';
import { loadUserImages } from '../../store/actions/imagesActions';
import { loadUserComments } from '../../store/actions/userActions';
import { selectUser, selectComments } from '../../store/reducers/userReducer';
import CommentRow from '../commentRow/commentRow';

const ProfileCommentList: React.FC = () => {
    const dispatch = useDispatch();

    const refreshing = useSelector(selectRefreshingUserImages);
    const comments: Comment[] = useSelector(selectComments);
    const user = useSelector(selectUser);

    const refreshComments = () => {
        if (!user || !user.token) {
            return;
        }

        dispatch(loadUserComments(user.token));
    };

    return (
        <FlatList
            style={commentListStyles.commentList}
            keyExtractor={item => `image-${item.id}`}
            data={comments}
            renderItem={({ item }) => <CommentRow comment={item} />}
            refreshControl={
                <RefreshControl
                    onRefresh={refreshComments}
                    refreshing={refreshing}
                />
            }></FlatList>
    );
};

export default ProfileCommentList;
