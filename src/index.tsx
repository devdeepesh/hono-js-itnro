import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
import { isValidObjectId } from "mongoose";

import dbConnect from "./db/connect";
import FavYoutubeVideosModel from "./db/fav-youtube-videos.model";

const app = new Hono();

app.use(poweredBy());
app.use(logger());

dbConnect()
    .then(() => {
        // Get List
        app.get("/", async (c) => {
            const documents = await FavYoutubeVideosModel.find();

            return c.json(
                documents.map((d) => d.toObject()),
                200
            );
        });

        // Create Document
        app.post("/", async (c) => {
            const formData = await c.req.json();

            if (!formData.thumbnailUrl) delete formData.thumbnailUrl;

            const favYoutubeVideosObj = new FavYoutubeVideosModel(formData);

            try {
                const document = await favYoutubeVideosObj.save();

                return c.json(document.toObject(), 201);
            } catch (error) {
                return c.json(
                    (error as any)?.message || "Internal Server Error",
                    500
                );
            }
        });

        // View document by id
        app.get("/:documentId", async (c) => {
            const id = c.req.param("documentId");

            if (!isValidObjectId(id)) return c.json("Invalid ID", 400);

            const document = await FavYoutubeVideosModel.findById(id);

            if (!document) return c.json("Document Not Found", 404);

            return c.json(document.toObject(), 200);
        });

        // View document description stream by id
        app.get("/d/:documentId", async (c) => {
            const id = c.req.param("documentId");

            const document = await FavYoutubeVideosModel.findById(id);

            if (!document) return c.json("Document Not Found", 404);

            return stream(c, async (stream) => {
                // Write a process to be executed when aborted.
                stream.onAbort(() => {
                    console.log("Aborted!");
                });

                const wordSplit = document.description.split(" ");

                for (let i = 0; i < wordSplit.length; i++) {
                    const word = wordSplit[i];

                    await stream.write(`${word} `);
                    await stream.sleep(100);
                }
            });
        });

        // Update Document
        app.patch("/:documentId", async (c) => {
            const id = c.req.param("documentId");

            if (!isValidObjectId(id)) return c.json("Invalid ID", 400);

            const document = await FavYoutubeVideosModel.findById(id);

            if (!document) return c.json("Document Not Found", 404);

            const formData = await c.req.json();

            if (!formData.thumbnailUrl) delete formData.thumbnailUrl;

            try {
                const updatedDocument =
                    await FavYoutubeVideosModel.findByIdAndUpdate(
                        id,
                        formData,
                        {
                            new: true,
                        }
                    );

                return c.json(updatedDocument?.toObject(), 200);
            } catch (error) {
                return c.json(
                    (error as any)?.message || "Internal Server Error",
                    500
                );
            }
        });

        // Delete Document
        app.delete("/:documentId", async (c) => {
            const id = c.req.param("documentId");

            try {
                const deletedDocument =
                    await FavYoutubeVideosModel.findByIdAndDelete(id);

                return c.json(deletedDocument?.toObject(), 200);
            } catch (error) {
                return c.json(
                    (error as any)?.message || "Internal Server Error",
                    500
                );
            }
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
