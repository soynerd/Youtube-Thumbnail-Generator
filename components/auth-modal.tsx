"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (open) {
      setTab(initialTab ?? "signin");
    } else {
      setTab("signin");
    }
  }, [open, initialTab]);

  function completeAuth() {
    document.cookie = "tf_auth=true; Max-Age=2592000; path=/";
    onOpenChange(false);
    router.push("/generate");
    router.refresh();
  }

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

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
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

          {/* --- Sign In --- */}
          <TabsContent value="signin" className="mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl"
                />
              </div>
              <Button
                onClick={completeAuth}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-2 hover:scale-[1.02] transition"
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          {/* --- Sign Up --- */}
          <TabsContent value="signup" className="mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email2">Email</Label>
                <Input
                  id="email2"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">Password</Label>
                <Input
                  id="password2"
                  type="password"
                  placeholder="Create a password"
                  className="rounded-xl"
                />
              </div>
              <Button
                onClick={completeAuth}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-2 hover:scale-[1.02] transition"
              >
                Create Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Divider + Social Login Stub */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-muted"></div>
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-muted"></div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-xl hover:scale-[1.02] transition"
        >
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
