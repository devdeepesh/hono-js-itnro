import { IFavYoutubeVideosSchema } from "../db/fav-youtube-videos.model";

export default function Create({
    formError,
}: {
    formError?: Partial<
        Record<keyof IFavYoutubeVideosSchema, string> & { form: string }
    >;
}) {
    return (
        <section class="container mx-auto py-12">
            {formError?.form && (
                <p class="text-red-600 pl-2">{formError.form}</p>
            )}
            <form
                action="/create"
                method="post"
                class="w-full max-w-xl bg-gray-100 rounded-xl mx-auto p-4 flex flex-col gap-4"
            >
                <div class="block relative">
                    <label for="title" class="inline-block mb-1">
                        Video Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        class="px-3 py-1 border border-black/20 w-full rounded-xl"
                        placeholder="title"
                    />
                    {formError?.title && (
                        <p class="text-red-600 pl-2">{formError.title}</p>
                    )}
                </div>
                <div class="block relative">
                    <label for="youtuberName" class="inline-block mb-1">
                        Youtuber Name
                    </label>
                    <input
                        name="youtuberName"
                        type="text"
                        id="youtuberName"
                        class="px-3 py-1 border border-black/20 w-full rounded-xl"
                        placeholder="youtuber's name"
                    />
                    {formError?.youtuberName && (
                        <p class="text-red-600 pl-2">
                            {formError.youtuberName}
                        </p>
                    )}
                </div>
                <div class="block relative">
                    <label for="description" class="inline-block mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        type="text"
                        id="description"
                        class="px-3 py-1 border border-black/20 w-full rounded-xl h-20"
                        placeholder="description"
                    />
                    {formError?.description && (
                        <p class="text-red-600 pl-2">{formError.description}</p>
                    )}
                </div>
                <div class="block relative">
                    <label for="thumbnailUrl" class="inline-block mb-1">
                        Thumbnail URL
                    </label>
                    <input
                        name="thumbnailUrl"
                        type="url"
                        id="thumbnailUrl"
                        class="px-3 py-1 border border-black/20 w-full rounded-xl"
                        placeholder="thumbnailUrl"
                    />
                    {formError?.thumbnailUrl && (
                        <p class="text-red-600 pl-2">
                            {formError.thumbnailUrl}
                        </p>
                    )}
                </div>
                <div class="block relative">
                    <label for="watched" class="inline-flex gap-2">
                        <input
                            name="watched"
                            type="checkbox"
                            id="watched"
                            class="px-3 py-1 border border-black/20 rounded-xl"
                            placeholder="watched"
                            value="true"
                        />
                        Have you watched the video yet
                    </label>
                    {formError?.thumbnailUrl && (
                        <p class="text-red-600 pl-2">
                            {formError.thumbnailUrl}
                        </p>
                    )}
                </div>
                <button class="inline-block bg-green-600 px-4 py-2 rounded-xl text-white hover:bg-green-500">
                    Create
                </button>
            </form>
        </section>
    );
}
