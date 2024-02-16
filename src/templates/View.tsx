import { IFavYoutubeVideosSchema } from "../db/fav-youtube-videos.model";

export default function View({
    videoDetails,
}: {
    videoDetails: IFavYoutubeVideosSchema & { _id: string };
}) {
    const deleteDocument = async () => {
        console.log("yes");
    };

    return (
        <section class="container mx-auto py-12 px-4">
            <div className="flex justify-center relative overflow-hidden p-2 border border-black/20 rounded-xl">
                <img src={videoDetails.thumbnailUrl} class="rounded-xl" />
                {videoDetails.watched && (
                    <div class="inline-block bg-blue-600 px-6 py-1 absolute top-2.5 -right-7 rotate-45 text-white text-sm">
                        watched
                    </div>
                )}
            </div>

            <div className="flex mt-2">
                <div className="block w-full">
                    <small class="text-blue-600">
                        {videoDetails.youtuberName}
                    </small>
                    <h1 class="text-lg font-bold">{videoDetails.title}</h1>
                </div>
                <div className="shrink-0">
                    <button
                        onClick={deleteDocument}
                        class="inline-block bg-red-600 px-4 py-2 rounded-xl text-white hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
}
