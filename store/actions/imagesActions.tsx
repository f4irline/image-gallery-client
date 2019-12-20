import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Image } from "../../models/Image"

import { api } from '../../utils';
import { Comment } from '../../models';
import { AnyAction } from 'redux';

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
    type: ImagesActionTypes.RemoveImage,
}

interface RemoveImageSuccessAction {
    type: ImagesActionTypes.RemoveImageSuccess,
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
    payload: { comment: Comment, image: Image };
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
    }
};

const refreshUserImages = (state: boolean) => {
    return {
        type: ImagesActionTypes.RefreshUserImages,
        payload: state,
    }
};

const setImages = (images: Image[]) => {
    return {
        type: ImagesActionTypes.SetImages,
        payload: images
    };
};

const addComment = (comment: Comment, image: Image) => {
    return {
        type: ImagesActionTypes.AddComment,
        payload: { comment: comment, image: image }
    }
};

const removeComment = (comment: Comment) => {
    return {
        type: ImagesActionTypes.RemoveComment,
        payload: { comment: comment }
    }
};

const setImageToView = (image: Image) => {
    return {
        type: ImagesActionTypes.SetImageInView,
        payload: image
    }
};

const uploadSuccess = (success: boolean) => {
    return {
        type: ImagesActionTypes.SetUploadSuccess,
        payload: { success: success },
    }
};

const setUserImages = (images: Image[]) => {
    return {
        type: ImagesActionTypes.SetUserImages,
        payload: images,
    }
};

const removeImageSuccess = (image: Image) => {
    return {
        type: ImagesActionTypes.RemoveImageSuccess,
        payload: image,
    }
}

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
    }
}

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
    }
}

export const uploadImage = (
    data: FormData, token: string
): ThunkAction<Promise<void>, {}, {}, UploadImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, RefreshImagesAction>
    ): Promise<void> => {
        try {
            const image = await api.post(`/image/${token}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch<any>(loadUserImages(token));
            dispatch<any>(loadImages(token));
            dispatch<any>(uploadSuccess(true));
        } catch (err) {
            console.log(err);
        }
    }
}

export const sendComment = (
    userComment: Comment, token: string, image: Image
): ThunkAction<Promise<void>, {}, {}, SendCommentAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, AddCommentAction>
    ): Promise<void> => {
        try {
            const comment = await api.post(`/comment/${image.id}/${token}`, userComment);
            dispatch<any>(addComment(comment.data as Comment, image));
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteComment = (
    userComment: Comment, token: string, 
): ThunkAction<Promise<void>, {}, {}, RemoveCommentAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        try {
            await api.delete(`/comment/${token}/${userComment.id}`)
            dispatch<any>(removeComment(userComment));
        } catch (err) {
            console.log(err);
        }
    }
}

export const voteImage = (
    token: string, image: Image, upVote: boolean, reset: boolean = false
): ThunkAction<Promise<void>, {}, {}, VoteImageAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, SetImageInViewAction>
    ): Promise<void> => {
        try {
            if (reset) {
                const img = await api.put(`/image/vote/${token}/${image.id}/reset`);
                dispatch<any>(setImageToView(img.data as Image));
            } else {
                const img = await api.put(`/image/vote/${token}/${image.id}/${upVote}`);
                dispatch<any>(setImageToView(img.data as Image));
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const loadImage = (
    image: Image, token?: string
): ThunkAction<Promise<void>, {}, {}, LoadImageAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, SetImageInViewAction>
    ): Promise<void> => {
        try {
            const img = await api.get(`/image/single/${image.id}/${token || ''}`);
            dispatch<any>(setImageToView(img.data as Image));
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteImage = (
    image: Image, token: string
): ThunkAction<Promise<void>, {}, {}, RemoveImageAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, RemoveImageSuccessAction>
    ): Promise<void> => {
        try {
            await api.delete(`/image/${token}/${image.id}`);
            dispatch<any>(removeImageSuccess(image));
        } catch (err) {
            console.log(err);
        }
    }
}

export type ImagesActions = 
    LoadImagesAction | SetImagesAction | SetUserImagesAction | 
    SetImageInViewAction | SetUploadSuccessAction | RefreshUserImagesAction | 
    RefreshImagesAction | AddCommentAction | RemoveCommentAction |
    RemoveImageSuccessAction;