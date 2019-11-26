import { Action } from 'redux';
import { imagesActionTypes, ImagesActions } from '../actions/imagesActions';
import { Image } from '../../models/Image';

export interface ImagesState {
    images: Image[]
}

export const initialState: ImagesState = {
    images: [],
};

export const imagesReducer = (state: ImagesState = initialState, action: ImagesActions) => {
    switch (action.type) {
        case imagesActionTypes.SET_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        
        default:
            return state;
    }
}

