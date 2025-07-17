import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        {/* <Image
          className="dark:invert"
          src="/logo.svg" // Replace with your logo if available
          alt="SnipLink logo"
          width={180}
          height={38}
          priority
        /> */}

        <h1 className="text-3xl font-bold">Welcome to SnipLink 👋</h1>
        <p className="text-gray-500 max-w-xl">
          Instantly generate shareable links for your code snippets directly
          from VS Code. Perfect for Slack, quick reviews, or async
          collaboration.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-md border border-transparent transition-colors flex items-center justify-center bg-black text-white dark:bg-white dark:text-black hover:opacity-80 font-medium text-sm sm:text-base h-10 sm:h-12 px-5"
            href="https://marketplace.visualstudio.com/" // Replace with your extension URL later
            target="_blank"
            rel="noopener noreferrer"
          >
            Install VS Code Extension
          </a>

          <Link
            className="rounded-md border border-solid border-black/[.1] dark:border-white/[.2] transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-5"
            href="/share/6874e052e5dcd008c58fabf2"
          >
            View Demo Snippet
          </Link>
        </div>
      </main>

      <footer className="row-start-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        © {new Date().getFullYear()} SnipLink  Built with ❤️ by Trot.tk
      </footer>
    </div>
  );
}
