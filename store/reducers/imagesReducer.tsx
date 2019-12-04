import { Reducer } from 'redux';

import { ImagesActionTypes, ImagesActions } from '../actions/imagesActions';

import { Image, PlaceholderImage } from '../../models';

import { AppState } from '../index';

export interface ImagesState {
    images: PlaceholderImage[],
}

export const initialState: ImagesState = {
    images: [],
};

export const imagesReducer: Reducer<ImagesState, ImagesActions> = (state: ImagesState = initialState, action: ImagesActions) => {
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