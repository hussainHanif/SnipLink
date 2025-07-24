"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const items = [
    {
      src: "/screenshots/select-code.png",
      alt: "Select code",
      description: "1. Select the code snippet in VS Code",
    },
    {
      src: "/screenshots/copy-command.png",
      alt: "Copy command",
      description:
        "2. Use the SnipLink command or press Ctrl + Alt + S to generate a shareable link",
    },
    {
      src: "/screenshots/url-copied.png",
      alt: "Link copied",
      description: "3. SnipLink is copied to clipboard – ready to paste",
    },
    {
      src: "/screenshots/share-page.png",
      alt: "Shared view",
      description: "4. Paste in browser or share it anywhere you want!",
    },
  ];

  const handleImageClick = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  return (
    <>
      <header className="sticky top-0 bg-[#0a0a0a] p-2 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <Image src="/screenshots/image.png" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl sm:text-3xl font-bold">SnipLink</h1>
          <div className="flex flex-wrap gap-2 ml-auto">
            <a
              href="https://marketplace.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 px-5 text-sm font-medium text-white transition-colors bg-black border border-transparent rounded-md sm:h-12 sm:text-base dark:bg-white dark:text-black hover:opacity-80"
            >
              Install VS Code Extension
            </a>
          </div>
        </div>
      </header>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 overflow-auto">
        <main className="flex flex-col gap-8 row-start-2 items-center text-center w-full">
          <h1 className="text-3xl font-bold">Welcome to SnipLink 👋</h1>
          <p className="text-gray-500 max-w-xl">
            Instantly generate shareable links for your code snippets directly
            from VS Code. Perfect for Slack, quick reviews, or async
            collaboration.
          </p>

          <section className="max-w-5xl w-full mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              How SnipLink Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-4 cursor-pointer w-full"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="rounded-xl shadow-md"
                    width={500}
                    height={500}
                  />
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
            <a
              className="rounded-md border border-transparent transition-colors flex items-center justify-center bg-black text-white dark:bg-white dark:text-black hover:opacity-80 font-medium text-sm sm:text-base h-10 sm:h-12 px-5"
              href="https://marketplace.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install VS Code Extension
            </a>

            <Link
              className="rounded-md border border-solid border-black/[.1] dark:border-white/[.2] transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-5"
              href="/share/dx4dXALC0"
            >
              View Demo Snippet
            </Link>
          </div>
        </main>

        <footer className="row-start-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} SnipLink • Built with ❤️ by Trot.tk
        </footer>

        {fullscreenIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <Image
                src={items[fullscreenIndex].src}
                alt={items[fullscreenIndex].alt}
                className="rounded-md max-w-full max-h-screen object-contain"
                width={800}
                height={800}
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={closeFullscreen}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
