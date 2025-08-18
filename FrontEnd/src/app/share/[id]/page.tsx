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
        <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-[var(--background)] text-[var(--foreground)]">
          <div className="text-center max-w-md w-full mx-auto px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Database Error</h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] mb-4 sm:mb-6">Unable to fetch the code snippet at this time.</p>
            <Link href="/" className="inline-block text-sm sm:text-base text-[var(--foreground)] hover:opacity-80 underline py-2 px-4 rounded-md border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors">
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
      <main className="min-h-screen flex flex-col gap-4 p-2 bg-[var(--background)] text-[var(--foreground)]">
        <header className="sticky top-0 bg-[var(--background)] p-2 z-50 border-b border-[var(--border)]">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">SnipLink</h1>
            <div className="flex items-center space-x-2 ml-auto">
              <div className="flex items-center gap-2 flex-nowrap">
                <CopyButton code={snippet.code} />
                <QRCodeBlock url={url} />
              </div>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Trottk.sniplink"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center h-10 px-4 text-sm font-medium text-[var(--background)] transition-colors bg-[var(--foreground)] border border-[var(--border)] rounded-md sm:h-10 hover:opacity-80 whitespace-nowrap"
              >
                Install Extension
              </a>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Trottk.sniplink"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden flex items-center justify-center h-10 px-3 text-xs font-medium text-[var(--background)] transition-colors bg-[var(--foreground)] border border-[var(--border)] rounded-md hover:opacity-80"
              >
                Install Extension
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
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--background)] text-[var(--foreground)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-[var(--muted-foreground)] mb-4">An unexpected error occurred while loading the page.</p>
          <Link href="/" className="text-[var(--foreground)] hover:opacity-80 underline">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }
}
