import { AppState } from '../index';

import { ImagesActionTypes, ImagesActions } from '../actions/imagesActions';
import { Image } from '../../models/Image';
import { PlaceholderImage } from '../../models/PlaceholderImage';

export interface ImagesState {
    images: PlaceholderImage[],
}

export const initialState: ImagesState = {
    images: [],
};

export const imagesReducer = (state: ImagesState = initialState, action: ImagesActions) => {
    switch (action.type) {
        case ImagesActionTypes.SetImages:
            return {
                ...state,
                images: action.payload,
            }
        
        default:
            return state;
    }
}

export const selectImages = (state: AppState) => state.imagesState.images;