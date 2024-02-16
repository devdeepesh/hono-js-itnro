import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { stream, streamText, streamSSE } from "hono/streaming";
import { isValidObjectId } from "mongoose";
import { jsxRenderer } from "hono/jsx-renderer";

import Home from "./templates/home";
import dbConnect from "./db/connect";
import FavYoutubeVideosModel, {
    IFavYoutubeVideosSchema,
} from "./db/fav-youtube-videos.model";
import Layout from "./templates/Layout";
import Create from "./templates/Create";
import View from "./templates/View";

const app = new Hono();

app.use(poweredBy());
app.use(logger());

// Serve Pubilc/Static Files
app.use("/style.css", serveStatic({ path: "./public/style.css" }));
// app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

dbConnect()
    .then(() => {
        // defining that default renderer is jsx with setting up global layout
        app.all("/*", jsxRenderer(Layout));

        // Get List
        app.get("/", async (c) => {
            const documents = await FavYoutubeVideosModel.find();

            return c.render(
                <Home videoList={documents.map((d) => d.toObject())} />
            );
        });

        // Create Form
        app.get("/create", (c) => c.render(<Create />));

        // Create Document
        app.post("/create", async (c) => {
            const formData = await c.req.parseBody<
                Partial<Record<keyof IFavYoutubeVideosSchema, string>>
            >();
            const formError: Partial<
                Record<keyof IFavYoutubeVideosSchema, string>
            > = {};

            if (!formData.title) formError.title = "Title is required";

            if (!formData.youtuberName)
                formError.youtuberName = "youtuber's name is required";

            if (!formData.description)
                formError.description = "Description is required";

            if (Object.keys(formError).length > 0)
                return c.render(<Create formError={formError} />);

            if (!formData.thumbnailUrl) delete formData.thumbnailUrl;

            const favYoutubeVideosObj = new FavYoutubeVideosModel(formData);

            try {
                const document = await favYoutubeVideosObj.save();

                if (!document) throw new Error("Error Creating Document");

                return c.redirect("/");
            } catch (error) {
                return c.render(
                    <Create formError={{ form: (error as any)?.message }} />
                );
            }
        });

        // View document by id
        app.get("/d/:documentId", async (c) => {
            const id = c.req.param("documentId");

            if (!isValidObjectId(id)) return c.redirect("/");

            const document = await FavYoutubeVideosModel.findById(id);

            if (!document) return c.redirect("/");

            return c.render(<View videoDetails={document.toObject()} />);
        });

        app.get("/stream", (c) => {
            return stream(c, async (stream) => {
                const documents = await FavYoutubeVideosModel.find();

                // Write a process to be executed when aborted.
                stream.onAbort(() => {
                    console.log("Aborted!");
                });

                for (let i = 0; i < documents.length; i++) {
                    const document = documents[i];

                    await stream.write(JSON.stringify(document));
                    await stream.sleep(500);
                }

                // Write a Uint8Array.
                // await stream.write(
                //     new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
                // );
                // Pipe a readable stream.
                // await stream.pipe(anotherReadableStream);
            });
        });
    })
    .catch((err) => {
        app.get("/*", (c) => {
            return c.text(`Failed to connect mongodb: ${err.message}`);
        });
    });

app.onError((err, c) => {
    return c.text(`App Error: ${err.message}`);
});

export default app;
