import { Snippet } from "@/types/snippet";
import { getDB } from "@/lib/mongo";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { QRCodeBlock } from "@/components/QRCodeBlock";
import Link from "next/link";

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    
    // Validate ID parameter
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.error('Invalid ID parameter:', id);
      return notFound();
    }

    const db = await getDB();
    const collection = db.collection<Snippet>("snippets");

    let snippet: Snippet | null = null;
    try {
      snippet = await collection.findOne({ _id: id });
    } catch (dbError) {
      console.error("Database error fetching snippet:", dbError);
      // Return a user-friendly error page instead of crashing
      return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Database Error</h1>
            <p className="text-gray-400 mb-4">Unable to fetch the code snippet at this time.</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
              Return to Home
            </Link>
          </div>
        </main>
      );
    }

    if (!snippet) {
      return notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/share/${snippet._id}`;

    return (
      <main className="min-h-screen flex flex-col gap-4 p-2 bg-[#0a0a0a] text-white">
        <header className="sticky top-0 bg-[#0a0a0a] p-2 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">SnipLink</h1>
            <div className="flex flex-wrap gap-2 ml-auto">
              <CopyButton code={snippet.code} />
              <QRCodeBlock url={url} />
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

        <div className="flex-grow overflow-hidden">
          <CodeBlock code={snippet.code.trimEnd()} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Unexpected error in SharePage:", error);
    
    // Return a user-friendly error page
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-4">An unexpected error occurred while loading the page.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }
}
