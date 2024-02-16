export default function Header() {
    return (
        <header
            id="header"
            class="py-2 shadow sticky top-0 inset-x-0 px-4 z-10 bg-white"
        >
            <div class="container mx-auto">
                <nav class="flex justify-between items-center">
                    <div class="mr-auto">
                        <a href="/">Logo</a>
                    </div>
                    <ul class="flex gap-4">
                        <li class="flex">
                            <a
                                class="inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
                                href="/create"
                            >
                                Add
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
