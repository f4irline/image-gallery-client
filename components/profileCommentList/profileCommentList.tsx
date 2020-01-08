import React, { useEffect } from 'react';
import { RefreshControl, FlatList } from 'react-native';

import commentListStyles from './profileCommentList.style';
import { Comment } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { selectRefreshingUserImages } from '../../store/reducers/imagesReducer';
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
            renderItem={({ item, index }) => (
                <CommentRow odd={index % 2 !== 0} comment={item} />
            )}
            refreshControl={
                <RefreshControl
                    onRefresh={refreshComments}
                    refreshing={refreshing}
                />
            }></FlatList>
    );
};

export default ProfileCommentList;
