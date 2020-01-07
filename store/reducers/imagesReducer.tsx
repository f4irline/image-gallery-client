import { Reducer } from 'redux';

import { ImagesActionTypes, ImagesActions } from '../actions/imagesActions';

import { Image } from '../../models';

import { AppState } from '../index';

export interface ImagesState {
    images: Image[];
    userImages: Image[];
    refreshingImages: boolean;
    refreshingUserImages: boolean;
    imageInView: Image | undefined;
    uploadSuccess: boolean;
    addCommentSuccess: boolean;
}

export const initialState: ImagesState = {
    images: [],
    userImages: [],
    refreshingImages: false,
    refreshingUserImages: false,
    imageInView: undefined,
    uploadSuccess: false,
    addCommentSuccess: false,
};

export const imagesReducer: Reducer<ImagesState, ImagesActions> = (
    state: ImagesState = initialState,
    action: ImagesActions
) => {
    switch (action.type) {
        case ImagesActionTypes.SetImages:
            return {
                ...state,
                images: action.payload,
            };

        case ImagesActionTypes.SetUserImages:
            return {
                ...state,
                userImages: action.payload,
            };

        case ImagesActionTypes.RefreshImages:
            return {
                ...state,
                refreshingImages: action.payload,
            };

        case ImagesActionTypes.RefreshUserImages:
            return {
                ...state,
                refreshingUserImages: action.payload,
            };

        case ImagesActionTypes.AddComment:
            return {
                ...state,
                imageInView: {
                    ...state.imageInView,
                    comments: [
                        action.payload.comment,
                        ...state.imageInView.comments,
                    ],
                },
            };

        case ImagesActionTypes.RemoveComment:
            return {
                ...state,
                imageInView: {
                    ...state.imageInView,
                    comments: [...state.imageInView.comments].filter(
                        comment => comment.id !== action.payload.comment.id
                    ),
                },
            };

        case ImagesActionTypes.SetImageInView:
            return {
                ...state,
                imageInView: action.payload,
            };

        case ImagesActionTypes.SetUploadSuccess:
            return {
                ...state,
                uploadSuccess: action.payload.success,
            };

        case ImagesActionTypes.RemoveImageSuccess:
            return {
                ...state,
                imageInView: undefined,
                images: state.images.filter(
                    img => img.id !== action.payload.id
                ),
                userImages: state.userImages.filter(
                    img => img.id !== action.payload.id
                ),
            };

        case ImagesActionTypes.AddCommentSuccess:
            return {
                ...state,
                addCommentSuccess: action.payload,
            };

        default:
            return state;
    }
};

export const selectImages = (state: AppState) => state.imagesState.images;
export const selectUserImages = (state: AppState) =>
    state.imagesState.userImages;
export const selectRefreshingImages = (state: AppState) =>
    state.imagesState.refreshingImages;
export const selectImageInView = (state: AppState) =>
    state.imagesState.imageInView;
export const selectUploadSuccess = (state: AppState) =>
    state.imagesState.uploadSuccess;
export const selectRefreshingUserImages = (state: AppState) =>
    state.imagesState.refreshingUserImages;
export const selectAddCommentSuccess = (state: AppState) =>
    state.imagesState.addCommentSuccess;
