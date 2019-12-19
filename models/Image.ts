import { Comment } from "./Comment";

export interface Image {
    name: string;
    description: string;
    canDelete: boolean;
    author: string;
    comments: Comment[];
    score: number;
    userUpVoted: boolean;
    userDownVoted: boolean;
    id: number;
    file: string;
    width: number;
    height: number;
}