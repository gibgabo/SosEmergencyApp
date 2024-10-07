import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import CategoryIcon from "@/Components/CategoryIcon";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    categories,
}) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };
    return (
        <>
            <Head title="Incidents Report" />
            <div className="text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                />
                <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 file:placeholder:relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full px-6 max-w-7xl">
                        <header className="grid items-center grid-cols-2 gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                {/* Optional Header Content */}
                            </div>
                        </header>

                        <main className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-6">
                            {Array.isArray(categories) &&
                            categories.length > 0 ? (
                                categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/incidents/add/${category.id}`} // Updated link format
                                        className="flex flex-col items-center justify-center p-10 border border-black rounded-lg shadow-lg dark:border-white card hover:transform hover:scale-110 hover:transition-transform hover:duration-300"
                                    >
                                        <CategoryIcon
                                            categoryType={
                                                category.category_type
                                            }
                                        />

                                        <span className="mt-2 font-bold text-center text-black dark:text-white">
                                            {category.category_type ||
                                                "Unnamed Category"}
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <p>No categories available</p>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
