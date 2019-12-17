import { Reducer } from 'redux';

import { ImagesActionTypes, ImagesActions } from '../actions/imagesActions';

import { Image } from '../../models';

import { AppState } from '../index';

export interface ImagesState {
    images: Image[];
    refreshing: boolean;
}

export const initialState: ImagesState = {
    images: [],
    refreshing: false,
};

export const imagesReducer: Reducer<ImagesState, ImagesActions> = (state: ImagesState = initialState, action: ImagesActions) => {
    switch (action.type) {
        case ImagesActionTypes.SetImages:
            return {
                ...state,
                images: action.payload,
            }

        case ImagesActionTypes.RefreshImages:
            return {
                ...state,
                refreshing: action.payload,
            }
        
        default:
            return state;
    }
}

export const selectImages = (state: AppState) => state.imagesState.images;
export const selectRefreshingImages = (state: AppState) => state.imagesState.refreshing;
