import { Comment } from "./Comment";

export interface PlaceholderImage {
    author: string;
    description: string;
    comments: Comment[];
    download_url: string;
    height: number;
    width: number;
    id: number;
}