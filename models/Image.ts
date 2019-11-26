import { Comment } from "./Comment";

export interface Image {
    name: string;
    description: string;
    canDelete: boolean;
    author: string;
    comments: Comment[];
    score: number;
    upVoted: boolean;
    downVoted: boolean;
    id: number;
    file: string;
}