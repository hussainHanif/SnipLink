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
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-[var(--background)] border-b border-[var(--border)] p-4 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">SnipLink</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://marketplace.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 px-5 text-sm font-medium transition-colors bg-[var(--foreground)] text-[var(--background)] rounded-md hover:opacity-90"
            >
              Install VS Code Extension
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Welcome to SnipLink</h1>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Instantly generate shareable links for your code snippets directly
            from VS Code. Perfect for Slack, quick reviews, or async
            collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10">
            <a
              className="rounded-md transition-colors flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-medium text-base h-12 px-6"
              href="https://marketplace.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install VS Code Extension
            </a>

            <Link
              className="rounded-md border border-solid border-[var(--border)] transition-colors flex items-center justify-center hover:bg-[var(--secondary)] font-medium text-base h-12 px-6"
              href="/share/dx4dXALC0"
            >
              View Demo Snippet
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            How SnipLink Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 border border-[var(--border)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto"
                    width={500}
                    height={500}
                    style={{ filter: 'none' }}
                    loading="eager"
                    priority={index < 2}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
                  />
                </div>
                <p className="text-sm text-[var(--muted-foreground)] font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto bg-[var(--secondary)] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Use SnipLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--card)] p-6 rounded-xl shadow-sm border border-[var(--border)]">
              <h3 className="font-semibold mb-2">Instant Sharing</h3>
              <p className="text-[var(--muted-foreground)] text-sm">Share code snippets with a single keyboard shortcut directly from your editor.</p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl shadow-sm border border-[var(--border)]">
              <h3 className="font-semibold mb-2">No Sign-up Required</h3>
              <p className="text-[var(--muted-foreground)] text-sm">Get started immediately without creating accounts or dealing with authentication.</p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl shadow-sm border border-[var(--border)]">
              <h3 className="font-semibold mb-2">Syntax Highlighting</h3>
              <p className="text-[var(--muted-foreground)] text-sm">Your code is displayed with proper syntax highlighting for better readability.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center">
        <div className="container mx-auto">
          <p className="text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} SnipLink • Built with ❤️ by <a href="https://trottk.com" className="hover:underline">Trot.tk</a>
          </p>
        </div>
      </footer>

      {fullscreenIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeFullscreen}>
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[fullscreenIndex].src}
              alt={items[fullscreenIndex].alt}
              className="rounded-md max-w-full max-h-[90vh] object-contain"
              width={1200}
              height={800}
              style={{ filter: 'none' }}
            />
            <button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              onClick={closeFullscreen}
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
