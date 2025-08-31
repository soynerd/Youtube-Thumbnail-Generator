// components/AuthModal.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function AuthModal({
  open,
  onOpenChange,
  initialTab,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialTab?: "signin" | "signup";
}) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTab(initialTab ?? "signin");
    } else {
      setSignInData({ email: "", password: "" });
      setSignUpData({ name: "", email: "", password: "" });
      setError(null);
    }
  }, [open, initialTab]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: "signin" | "signup"
  ) => {
    const { id, value } = e.target;
    if (form === "signin") {
      setSignInData((prev) => ({ ...prev, [id]: value }));
    } else {
      const fieldName = id.replace("2", "");
      setSignUpData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
        credentials: "include", // FIX: include cookies
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to sign in.");
      }

      onOpenChange(false);
      router.push("/generate");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
        credentials: "include", // FIX: include cookies
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create account.");
      }

      onOpenChange(false);
      router.push("/generate");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl shadow-xl p-6">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              ThumbForge AI
            </span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in or create an account to continue
          </DialogDescription>
        </DialogHeader>

        {/* rest of your component unchanged */}
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as any);
            setError(null); // Clear errors when switching tabs
          }}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 rounded-xl bg-muted p-1">
            <TabsTrigger
              value="signin"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* --- Sign In Form --- */}
          <TabsContent value="signin" className="mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl"
                  value={signInData.email}
                  onChange={(e) => handleInputChange(e, "signin")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl"
                  value={signInData.password}
                  onChange={(e) => handleInputChange(e, "signin")}
                  required
                />
              </div>

              {/* --- NEW: Error Display --- */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-2 hover:scale-[1.02] transition"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </form>
          </TabsContent>

          {/* --- Sign Up Form --- */}
          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="rounded-xl"
                  value={signUpData.name}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email2">Email</Label>
                <Input
                  id="email2"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl"
                  value={signUpData.email}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">Password</Label>
                <Input
                  id="password2"
                  type="password"
                  placeholder="Create a password (min. 8 characters)"
                  className="rounded-xl"
                  value={signUpData.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
              </div>

              {/* --- NEW: Error Display --- */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-2 hover:scale-[1.02] transition"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-muted"></div>
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-muted"></div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-xl hover:scale-[1.02] transition"
          disabled // You can enable this when you implement OAuth
        >
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
