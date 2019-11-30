import { Comment } from "./Comment";

export interface PlaceholderImage {
    author: string;
    description: string;
    canDelete: boolean;
    comments: Comment[];
    download_url: string;
    height: number;
    width: number;
    upVoted: boolean;
    downVoted: boolean;
    id: number;
}