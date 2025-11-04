"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

type VideoData = {
  i: number;
  loc: string;
  channelName: string;
  videoTitle: string;
};

const imageData: VideoData[] = [
  {
    i: 1,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic1.png?updatedAt=1762276428216",
    channelName: "Chai aur Code",
    videoTitle: "Chai Aur Caddy",
  },
  {
    i: 2,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic2.png?updatedAt=1762276430952",
    channelName: "Mohak Mangal",
    videoTitle: "India's Deadly Stray Dogs",
  },
  {
    i: 3,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic3.png?updatedAt=1762276431807",
    channelName: "Piyush Garg",
    videoTitle: "How Streaming Works",
  },
  {
    i: 4,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic4.png?updatedAt=1762276430317",
    channelName: "RG Bucket List",
    videoTitle: "Javelin Throw",
  },
  {
    i: 5,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic5.png?updatedAt=1762276427615",
    channelName: "Hitesh Choudhary",
    videoTitle: "New Course Launch",
  },
  {
    i: 6,
    loc: "https://ik.imagekit.io/soynerd/ThumbForge%20AI/pic6.png?updatedAt=1762276432337",
    channelName: "Chai Aur Anime",
    videoTitle: "One Piece Chapter 1134",
  },
];

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
          <span>🎨 Few-click editing</span>
          <span>⚡ Fast generation</span>
          <span>🌍 Multi-Images</span>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Stunning Thumbnails, Made in Seconds 🎨
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {imageData.map((details) => (
            <Card
              key={details.i}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-[1.02]"
            >
              <img
                src={details.loc}
                alt={details.videoTitle}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">{details.channelName}</h3>
                <p className="text-sm text-muted-foreground">
                  {details.videoTitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan 💎
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className={`rounded-2xl shadow-lg border border-muted"`}>
            <CardContent className="p-8 space-y-4 text-center">
              <h3 className="text-xl font-semibold">Basic</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                ₹100
              </p>
              <p className="text-muted-foreground">1 Image</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                {[
                  "High quality images",
                  "Fast AI generation",
                  "Easy editing",
                  "Follow up",
                  "Download as PNG",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-3 rounded-xl `} variant={"outline"}>
                Get Started
              </Button>
            </CardContent>
          </Card>
          <Card
            className={`rounded-2xl shadow-lg border border-blue-500 shadow-blue-500/30 scale-110`}
          >
            <CardContent className="p-8 space-y-4 text-center">
              <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
                Most Popular
              </div>

              <h3 className="text-xl font-semibold">Creater</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                ₹700
              </p>
              <p className="text-muted-foreground">10 Image</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                {[
                  "High quality images",
                  "Fast AI generation",
                  "Easy editing",
                  "Multiple Photo Upload",
                  "Unlimited download",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white`}
                variant={"default"}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
          <Card className={`rounded-2xl shadow-lg border border-muted"`}>
            <CardContent className="p-8 space-y-4 text-center">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                ₹1500
              </p>
              <p className="text-muted-foreground">30 Image</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                {[
                  "High quality images",
                  "Fast AI generation",
                  "Easy editing",
                  "Multiple Photo Upload",
                  "Unlimited download",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-3 rounded-xl `} variant={"outline"}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
