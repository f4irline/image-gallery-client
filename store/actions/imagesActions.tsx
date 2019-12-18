import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Image } from "../../models/Image"

import { api } from '../../utils';
import { UserImage } from '../../models';

export enum ImagesActionTypes {
    LoadImages = '[Images] Load Images',
    SetImages = '[Images] Set Images',
    RefreshImages = '[Images] Refresh Images',

    UploadImage = '[Images] Upload Image',
}

interface LoadImagesAction {
    type: ImagesActionTypes.LoadImages;
}

interface SetImagesAction {
    type: ImagesActionTypes.SetImages;
    payload: Image[];
}

interface RefreshImagesAction {
    type: ImagesActionTypes.RefreshImages;
    payload: boolean;
}

interface UploadImageAction {
    type: ImagesActionTypes.UploadImage;
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

export const loadImages = (): ThunkAction<Promise<void>, {}, {}, LoadImagesAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SetImagesAction>
    ): Promise<void> => {
        dispatch<any>(refreshImages(true));

        try {
            const images = await api.get(`/image/`);
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

export type ImagesActions = LoadImagesAction | SetImagesAction | RefreshImagesAction;