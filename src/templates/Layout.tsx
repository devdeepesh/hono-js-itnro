import { Child } from "hono/jsx";
import Header from "./Header";

export default function Layout({ children }: { children?: Child }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>HONO JS INTRO</title>
                <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
                <Header />
                <main class="pt-1" id="main">
                    {children}
                </main>
            </body>
        </html>
    );
}
