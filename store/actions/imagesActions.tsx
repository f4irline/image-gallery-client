import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Image } from "../../models/Image"
import { PlaceholderImage } from "../../models/PlaceholderImage"

import { api } from '../../utils';

export enum ImagesActionTypes {
    LoadImages = '[Images] Load Images',
    SetImages = '[Images] Set Images',
    RefreshImages = '[Images] Refresh Images',
}

interface LoadImagesAction {
    type: ImagesActionTypes.LoadImages;
}

interface SetImagesAction {
    type: ImagesActionTypes.SetImages;
    payload: PlaceholderImage[];
}

interface RefreshImagesAction {
    type: ImagesActionTypes.RefreshImages;
    payload: boolean;
}

const refreshImages = (state: boolean) => {
    return {
        type: ImagesActionTypes.RefreshImages,
        payload: state,
    }
}

const setImages = (images: PlaceholderImage[]) => {
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
            const page = Math.floor(Math.random() * 5) + 1;
            const images = await api.get(`?page=${page}`);
            const imagesData: PlaceholderImage[] = images.data;
            const mappedImages: PlaceholderImage[] = imagesData.map((img: PlaceholderImage, index: number) => ({
                ...img,
                description: 'Test description. This is a placeholder image with test description.',
                upVoted: index % 2 === 0,
                downVoted: index % 3 === 0 && index % 2 !== 0,
                canDelete: index % 2 === 0,
                comments: [
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 0
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 1
                    },
                    {
                        author: 'AnotherOne',
                        userCanDelete: false,
                        comment: 'So cool.',
                        id: 2
                    },
                    {
                        author: 'Username',
                        userCanDelete: true,
                        comment: 'Very nice image.',
                        id: 3
                    }
                ]
            }));

            dispatch<any>(setImages(mappedImages));
            dispatch<any>(refreshImages(false));
        } catch (err) {
            dispatch<any>(refreshImages(false));
            console.log(err);
        }
    }
}

export type ImagesActions = LoadImagesAction | SetImagesAction | RefreshImagesAction;