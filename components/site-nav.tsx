"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthModal } from "@/components/auth-modal";
import { useState, useEffect } from "react";
import { ListenAuthEvent } from "@/components/listen-auth-event";

export function SiteNav({ isAuthed }: { isAuthed: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authed, setAuthed] = useState(isAuthed);

  useEffect(() => {
    // keep in sync with server-provided prop
    setAuthed(isAuthed);
  }, [isAuthed]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setAuthed(false);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className="border-b sticky top-0 z-40 bg-background/70 backdrop-blur">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            ThumbForge AI
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`text-sm px-3 py-2 rounded-md ${
                pathname === "/" ? "bg-muted" : "hover:bg-muted"
              }`}
            >
              Home
            </Link>

            {authed ? (
              <>
                <Link
                  href="/generate"
                  className={`text-sm px-3 py-2 rounded-md ${
                    pathname === "/generate" ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  Image Generation
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMode("signin");
                    setAuthOpen(true);
                  }}
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthOpen(true);
                  }}
                >
                  Sign up
                </Button>
              </>
            )}

            <ThemeToggle />
          </nav>
        </div>
      </header>
      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        initialTab={authMode}
      />
      <ListenAuthEvent onOpen={setAuthOpen} onMode={setAuthMode} />
    </>
  );
}
