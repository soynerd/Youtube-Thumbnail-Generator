"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";
import React from "react";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthed = status === "authenticated" ? true : false;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SiteNav isAuthed={isAuthed} />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Designed for creators, powered by AI ✨
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <InnerLayout>{children}</InnerLayout>
    </SessionProvider>
  );
}
