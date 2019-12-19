import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Image } from "../../models/Image"

import { api } from '../../utils';
import { Comment } from '../../models';
import { AnyAction } from 'redux';

export enum ImagesActionTypes {
    LoadImages = '[Images] Load Images',
    SetImages = '[Images] Set Images',
    RefreshImages = '[Images] Refresh Images',

    LoadImage = '[Images] Load Image',
    SetImageInView = '[Images] Set Image In View',

    UploadImage = '[Images] Upload Image',

    SendComment = '[Images] Send Comment',
    AddComment = '[Images] Add Comment',

    VoteImage = '[Images] Vote Image',
}

interface LoadImagesAction {
    type: ImagesActionTypes.LoadImages;
}

interface SetImagesAction {
    type: ImagesActionTypes.SetImages;
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

interface UploadImageAction {
    type: ImagesActionTypes.UploadImage;
}

interface SendCommentAction {
    type: ImagesActionTypes.SendComment;
}

interface AddCommentAction {
    type: ImagesActionTypes.AddComment;
    payload: { comment: Comment, image: Image };
}

interface VoteImageAction {
    type: ImagesActionTypes.VoteImage;
    payload: { image: Image, upVote: boolean };
}

const refreshImages = (state: boolean) => {
    return {
        type: ImagesActionTypes.RefreshImages,
        payload: state,
    }
}

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

const setImageToView = (image: Image) => {
    return {
        type: ImagesActionTypes.SetImageInView,
        payload: image
    }
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
    }
}

export const uploadImage = (
    data: FormData, token: string
): ThunkAction<Promise<void>, {}, {}, UploadImageAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, RefreshImagesAction>
    ): Promise<void> => {
        try {
            await api.post(`/image/${token}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch<any>(loadImages());
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

export const voteImage = (
    token: string, image: Image, upVote: boolean
): ThunkAction<Promise<void>, {}, {}, VoteImageAction> => {
    return async(
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        try {
            await api.put(`/image/vote/${token}/${image.id}/${upVote}`);
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

export type ImagesActions = LoadImagesAction | SetImagesAction | SetImageInViewAction | RefreshImagesAction | AddCommentAction;