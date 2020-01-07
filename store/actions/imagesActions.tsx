import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Image } from '../../models/Image';

import { api } from '../../utils';
import { Comment } from '../../models';
import { AnyAction } from 'redux';

import { PreferencesActionTypes } from './preferencesActions';
import {
    removeComment as removeUserComment,
    addComment as addUserComment,
} from './userActions';

export enum ImagesActionTypes {
    LoadImages = '[Images] Load Images',
    SetImages = '[Images] Set Images',
    RefreshImages = '[Images] Refresh Images',

    LoadUserImages = '[Images] Load User Images',
    SetUserImages = '[Images] Set User Images',
    RefreshUserImages = '[Images] Refresh User Images',

    LoadImage = '[Images] Load Image',
    SetImageInView = '[Images] Set Image In View',

    UploadImage = '[Images] Upload Image',
    SetUploadSuccess = '[Images] Upload Success',

    RemoveImage = '[Images] Remove Image',
    RemoveImageSuccess = '[Images] Remove Image Success',

    SendComment = '[Images] Send Comment',
    AddComment = '[Images] Add Comment',
    RemoveComment = '[Images] Remove Comment',

    VoteImage = '[Images] Vote Image',
}

interface LoadImagesAction {
    type: ImagesActionTypes.LoadImages;
}

interface SetImagesAction {
    type: ImagesActionTypes.SetImages;
    payload: Image[];
}

interface RemoveImageAction {
    type: ImagesActionTypes.RemoveImage;
}

interface RemoveImageSuccessAction {
    type: ImagesActionTypes.RemoveImageSuccess;
    payload: Image;
}

interface LoadUserImagesAction {
    type: ImagesActionTypes.LoadUserImages;
}

interface SetUserImagesAction {
    type: ImagesActionTypes.SetUserImages;
    payload: Image[];
}

interface LoadImageAction {
    type: ImagesActionTypes.LoadImage;
}

interface SetImageInViewAction {
    type: ImagesActionTypes.SetImageInView;
    payload: Image;
}

interface RefreshImagesAction {
    type: ImagesActionTypes.RefreshImages;
    payload: boolean;
}

interface RefreshUserImagesAction {
    type: ImagesActionTypes.RefreshUserImages;
    payload: boolean;
}

interface UploadImageAction {
    type: ImagesActionTypes.UploadImage;
}

interface SetUploadSuccessAction {
    type: ImagesActionTypes.SetUploadSuccess;
    payload: { success?: boolean };
}

interface SendCommentAction {
    type: ImagesActionTypes.SendComment;
}

interface AddCommentAction {
    type: ImagesActionTypes.AddComment;
    payload: { comment: Comment; image: Image };
}

interface RemoveCommentAction {
    type: ImagesActionTypes.RemoveComment;
    payload: { comment: Comment };
}

interface VoteImageAction {
    type: ImagesActionTypes.VoteImage;
}

const refreshImages = (state: boolean) => {
    return {
        type: ImagesActionTypes.RefreshImages,
        payload: state,
    };
};

const refreshUserImages = (state: boolean) => {
    return {
        type: ImagesActionTypes.RefreshUserImages,
        payload: state,
    };
};

const setImages = (images: Image[]) => {
    return {
        type: ImagesActionTypes.SetImages,
        payload: images,
    };
};

const addComment = (comment: Comment, image: Image) => {
    return {
        type: ImagesActionTypes.AddComment,
        payload: { comment: comment, image: image },
    };
};

const removeComment = (comment: Comment) => {
    return {
        type: ImagesActionTypes.RemoveComment,
        payload: { comment: comment },
    };
};

const setImageToView = (image: Image) => {
    return {
        type: ImagesActionTypes.SetImageInView,
        payload: image,
    };
};

const uploadSuccess = (success: boolean) => {
    return {
        type: ImagesActionTypes.SetUploadSuccess,
        payload: { success: success },
    };
};

const setUserImages = (images: Image[]) => {
    return {
        type: ImagesActionTypes.SetUserImages,
        payload: images,
    };
};

const removeImageSuccess = (image: Image) => {
    return {
        type: ImagesActionTypes.RemoveImageSuccess,
        payload: image,
    };
};

export const loadImages = (
    token?: string
): ThunkAction<Promise<void>, {}, {}, LoadImagesAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetImagesAction>
    ): Promise<void> => {
        dispatch<any>(refreshImages(true));

        try {
            const images = await api.get(`/image/${token || ''}`);
            const imagesData: Image[] = images.data;

            dispatch<any>(setImages(imagesData));
            dispatch<any>(refreshImages(false));
        } catch (err) {
            dispatch<any>(refreshImages(false));
            console.log(err);
        }
    };
};

export const loadUserImages = (
    token: string
): ThunkAction<Promise<void>, {}, {}, LoadUserImagesAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetUserImagesAction>
    ): Promise<void> => {
        dispatch<any>(refreshUserImages(true));

        try {
            const images = await api.get(`/image/user/${token}`);
            const imagesData: Image[] = images.data;

            dispatch<any>(setUserImages(imagesData));
            dispatch<any>(refreshUserImages(false));
        } catch (err) {
            dispatch<any>(refreshUserImages(false));
            console.log(err);
        }
    };
};

export const uploadImage = (
    data: FormData,
    token: string
): ThunkAction<Promise<void>, {}, {}, UploadImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, RefreshImagesAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            await api.post(`/image/${token}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch<any>(loadUserImages(token));
            dispatch<any>(loadImages(token));
            dispatch<any>(uploadSuccess(true));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export const sendComment = (
    userComment: Comment,
    token: string,
    image: Image
): ThunkAction<Promise<void>, {}, {}, SendCommentAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AddCommentAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            const comment = await api.post(
                `/comment/${image.id}/${token}`,
                userComment
            );
            dispatch<any>(addComment(comment.data as Comment, image));
            dispatch<any>(addUserComment(comment.data as Comment));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export const deleteComment = (
    userComment: Comment,
    token: string
): ThunkAction<Promise<void>, {}, {}, RemoveCommentAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            await api.delete(`/comment/${token}/${userComment.id}`);
            dispatch<any>(removeComment(userComment));
            dispatch<any>(removeUserComment(userComment));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export const voteImage = (
    token: string,
    image: Image,
    upVote: boolean,
    reset: boolean = false
): ThunkAction<Promise<void>, {}, {}, VoteImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetImageInViewAction>
    ): Promise<void> => {
        try {
            if (reset) {
                dispatch<any>(
                    setImageToView({
                        ...image,
                        score: image.userUpVoted
                            ? image.score - 1
                            : image.score + 1,
                        userUpVoted: false,
                        userDownVoted: false,
                    })
                );

                await api.put(`/image/vote/${token}/${image.id}/reset`);
            } else {
                dispatch<any>(
                    setImageToView({
                        ...image,
                        userUpVoted: upVote,
                        userDownVoted: !upVote,
                        score: upVote
                            ? image.userDownVoted
                                ? image.score + 2
                                : image.score + 1
                            : image.userUpVoted
                            ? image.score - 2
                            : image.score - 1,
                    })
                );

                await api.put(`/image/vote/${token}/${image.id}/${upVote}`);
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadImage = (
    imageId: number,
    token?: string
): ThunkAction<Promise<void>, {}, {}, LoadImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetImageInViewAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            const img = await api.get(
                `/image/single/${imageId}/${token || ''}`
            );
            dispatch<any>(setImageToView(img.data as Image));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export const deleteImage = (
    image: Image,
    token: string
): ThunkAction<Promise<void>, {}, {}, RemoveImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, RemoveImageSuccessAction>
    ): Promise<void> => {
        dispatch<any>({
            type: PreferencesActionTypes.SetLoading,
            payload: true,
        });

        try {
            await api.delete(`/image/${token}/${image.id}`);
            dispatch<any>(removeImageSuccess(image));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch<any>({
                type: PreferencesActionTypes.SetLoading,
                payload: false,
            });
        }
    };
};

export type ImagesActions =
    | LoadImagesAction
    | SetImagesAction
    | SetUserImagesAction
    | SetImageInViewAction
    | SetUploadSuccessAction
    | RefreshUserImagesAction
    | RefreshImagesAction
    | AddCommentAction
    | RemoveCommentAction
    | RemoveImageSuccessAction;
