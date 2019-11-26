import { Image } from "../../models/Image"

export const imagesActionTypes = {
    SET_IMAGES: '[Images] Set Images'
}

interface SetImagesAction {
    type: typeof imagesActionTypes.SET_IMAGES,
    payload: Image[],
}

export type ImagesActions = SetImagesAction;