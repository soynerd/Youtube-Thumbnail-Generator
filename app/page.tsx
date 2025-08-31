"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="text-center space-y-6 py-24 bg-gradient-to-b from-background to-background/80">
        <div className="inline-block rounded-full px-4 py-1 text-sm border border-blue-600 text-blue-400 bg-blue-600/10">
          ⚡ AI-powered Thumbnail Generator
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Turn Ideas into Eye-Catching Thumbnails ✨
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Instantly craft YouTube thumbnails with AI. Just type a prompt or
          upload an image — ThumbForge makes your ideas pop.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#" className="sr-only">
            Hidden for a11y
          </Link>

          <Button
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
            onClick={() => {
              const evt = new CustomEvent("open-auth-modal", {
                detail: { mode: "signin" },
              });
              window.dispatchEvent(evt);
            }}
          >
            Sign In 🚀
          </Button>

          <Button
            variant="outline"
            className="px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
            onClick={() => {
              const evt = new CustomEvent("open-auth-modal", {
                detail: { mode: "signup" },
              });
              window.dispatchEvent(evt);
            }}
          >
            Sign Up
          </Button>
        </div>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground mt-6">
          <span>🎨 One-click editing</span>
          <span>⚡ Fast generation</span>
          <span>🌍 Multi-language</span>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Stunning Thumbnails, Made in Seconds 🎨
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-[1.02]"
            >
              <img
                src={`https://picsum.photos/600/400?random=${i}`}
                alt="Generated Thumbnail"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">AI-Generated Thumbnail {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Created in seconds using ThumbForge.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-950/90 to-teal-900/90 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Loved by Creators ❤️
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              name: "Aarav",
              role: "YouTuber",
              review:
                "ThumbForge saved me hours every week. My thumbnails are 🔥 now!",
            },
            {
              name: "Priya",
              role: "Content Creator",
              review:
                "So easy to use! I just type an idea and get professional designs instantly.",
            },
            {
              name: "Rohan",
              role: "Streamer",
              review:
                "This tool gave my channel a boost. More clicks, more growth 🚀",
            },
          ].map((r, idx) => (
            <Card
              key={idx}
              className="rounded-2xl border border-blue-500/30 bg-white/5 backdrop-blur-lg hover:scale-105 transition shadow-lg"
            >
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-xl">
                  {r.name[0]}
                </div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-muted-foreground">{r.role}</p>
                <p className="text-sm leading-relaxed">{r.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Pricing */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan 💎
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard title="Basic" price="₹100" blurb="1 Image" />
          <PricingCard
            title="Creator"
            price="₹700"
            blurb="10 Images"
            highlight
          />
          <PricingCard title="Pro" price="₹1500" blurb="30 Images" />
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8 border-t border-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ThumbForge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-500">
              Docs
            </a>
            <a href="#" className="hover:text-blue-500">
              Pricing
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </footer> */}
    </main>
  );
}

function PricingCard({
  title,
  price,
  blurb,
  highlight,
}: {
  title: string;
  price: string;
  blurb: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={`rounded-2xl shadow-lg border ${
        highlight
          ? "border-blue-500 shadow-blue-500/30 scale-105"
          : "border-muted"
      }`}
    >
      <CardContent className="p-8 space-y-4 text-center">
        {highlight && (
          <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
            Most Popular
          </div>
        )}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
          {price}
        </p>
        <p className="text-muted-foreground">{blurb}</p>
        <ul className="space-y-2 text-sm text-muted-foreground text-left">
          {["High quality images", "Fast AI generation", "Easy editing"].map(
            (f, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                {f}
              </li>
            )
          )}
        </ul>
        <Button
          className={`w-full py-3 rounded-xl ${
            highlight
              ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
              : ""
          }`}
          variant={highlight ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
