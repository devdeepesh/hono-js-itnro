import type { FC } from "hono/jsx";
import { IFavYoutubeVideosSchema } from "../db/fav-youtube-videos.model";

type Props = {
    videoList: (IFavYoutubeVideosSchema & { _id: string })[];
};

const Home: FC<Props> = ({ videoList }) => {
    return (
        <section class="container py-12 grid grid-cols-6 px-2 mx-auto gap-4">
            {videoList.map((video) => (
                <a href={`/d/${video._id}`}>
                    <div class="rounded-xl relative border-black/20 border p-2 overflow-hidden">
                        <img
                            src={video.thumbnailUrl}
                            class="w-full rounded-xl"
                        />
                        <small class="text-blue-600">
                            by {video.youtuberName}
                        </small>
                        <h3 class="text-lg font-bold">{video.title}</h3>
                        {video.watched && (
                            <div class="inline-block bg-blue-600 px-6 py-1 absolute top-2.5 -right-7 rotate-45 text-white text-sm">
                                watched
                            </div>
                        )}
                    </div>
                </a>
            ))}
        </section>
    );
};

export default Home;
