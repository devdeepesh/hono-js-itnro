import { Schema, model } from "mongoose";

export interface IFavYoutubeVideosSchema {
    title: string;
    description: string;
    thumbnailUrl?: string;
    watched: boolean;
    youtuberName: string;
}

const FavYoutubeVideosSchema = new Schema<IFavYoutubeVideosSchema>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        default: "https://via.placeholder.com/1600x900.webp",
        required: false,
    },
    watched: {
        type: Boolean,
        default: false,
        required: true,
    },
    youtuberName: {
        type: String,
        required: true,
    },
});

const FavYoutubeVideosModel = model(
    "fav-youtube-videos",
    FavYoutubeVideosSchema
);

export default FavYoutubeVideosModel;
