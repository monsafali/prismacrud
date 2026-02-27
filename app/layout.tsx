import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Zero → CRUD Hero",
  description: "Next.js + Prisma + Postgres with Tailwind"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gray-900" />
              <div>
                <h1 className="text-lg font-semibold">Zero → CRUD Hero</h1>
                <p className="text-xs text-muted">Next.js + Prisma + Postgres (Docker)</p>
              </div>
            </div>
            <a
              href="https://www.prisma.io/"
              className="btn btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              Prisma Docs
            </a>
          </div>
        </header>

        <main className="container py-8">{children}</main>

        <footer className="mt-10 border-t py-6 text-center text-sm text-muted">
          Built with ❤️ using Next.js, Prisma, PostgreSQL & Tailwind
        </footer>
      </body>
    </html>
  );
}
