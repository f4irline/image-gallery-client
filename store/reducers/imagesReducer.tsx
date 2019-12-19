import { Reducer } from 'redux';

import { ImagesActionTypes, ImagesActions } from '../actions/imagesActions';

import { Image } from '../../models';

import { AppState } from '../index';

export interface ImagesState {
    images: Image[];
    refreshing: boolean;
    imageInView: Image | undefined;
}

export const initialState: ImagesState = {
    images: [],
    refreshing: false,
    imageInView: undefined,
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

        case ImagesActionTypes.AddComment:
            return {
                ...state,
                imageInView: {
                    ...state.imageInView,
                    comments: [action.payload.comment, ...state.imageInView.comments]
                },
            }

        case ImagesActionTypes.RemoveComment:
            return {
                ...state,
                imageInView: {
                    ...state.imageInView,
                    comments: [...state.imageInView.comments].filter(comment => comment.id !== action.payload.comment.id)
                },
            }

        case ImagesActionTypes.SetImageInView:
            return {
                ...state,
                imageInView: action.payload
            }
        
        default:
            return state;
    }
}

export const selectImages = (state: AppState) => state.imagesState.images;
export const selectRefreshingImages = (state: AppState) => state.imagesState.refreshing;
export const selectImageInView = (state: AppState) => state.imagesState.imageInView;
