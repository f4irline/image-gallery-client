import { Image } from "../../models/Image"

export enum ImagesActionTypes {
    SetImages = '[Images] Set Images'
}

interface SetImagesAction {
    type: typeof ImagesActionTypes.SetImages,
    payload: Image[],
}

export type ImagesActions = SetImagesAction;