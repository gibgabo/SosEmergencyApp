import { Link } from "@inertiajs/react";
import React from "react";
import CategoryIcon from "./CategoryIcon";

export default function Drawer() {
    return (
        <>
            {/* Button to open the right drawer */}
            <div className="text-center">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    data-drawer-target="drawer-right-example"
                    data-drawer-show="drawer-right-example"
                    data-drawer-placement="right"
                    aria-controls="drawer-right-example"
                >
                    Show right drawer
                </button>
            </div>

            {/* Drawer component */}
            <div
                id="drawer-right-example"
                className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
            >
                <h5
                    id="drawer-right-label"
                    className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                >
                    <svg
                        className="w-4 h-4 mr-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    Right drawer
                </h5>

                {/* Close button */}
                <button
                    type="button"
                    data-drawer-hide="drawer-right-example"
                    aria-controls="drawer-right-example"
                    className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>

                {/* Drawer content */}
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Supercharge your hiring by taking advantage of our{" "}
                    <a
                        href="#"
                        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                    >
                        limited-time sale
                    </a>{" "}
                    for Flowbite Docs + Job Board. Unlimited access to over 190K
                    top-ranked candidates and the #1 design job board.
                </p>

                {/* Grid of actions */}
                <div className="grid grid-cols-2 gap-4">
                    <a
                        href="#"
                        className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Learn more
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Get access
                        <svg
                            className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}
