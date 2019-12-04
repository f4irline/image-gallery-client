import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import api from '../../utils/api/Api';

import { Image } from "../../models/Image"
import { PlaceholderImage } from "../../models/PlaceholderImage"

export enum ImagesActionTypes {
    LoadImages = '[Images] Load Images',

    SetImages = '[Images] Set Images'
}

interface LoadImagesAction {
    type: ImagesActionTypes.LoadImages;
}

const setImages = (images: PlaceholderImage[]) => {
    return {
        type: ImagesActionTypes.SetImages,
        payload: images
    }
}

export const loadImages = (): ThunkAction<Promise<void>, {}, {}, LoadImagesAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, LoadImagesAction>
    ): Promise<void> => {
        try {
            const images = await api.get('/');
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
        } catch (err) {
            console.log(err);
        }
    }
}

export type ImagesActions = LoadImagesAction;