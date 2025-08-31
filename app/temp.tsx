"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-600/10 to-teal-500/10 border">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-balance">
            ThumbForge AI
          </h1>
          <p className="text-xl text-pretty">
            Forge stunning YouTube thumbnails from just words & ideas ✨
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ThumbForge AI helps you instantly generate eye-catching YouTube
            thumbnails using the power of AI. Just upload an image or type a
            prompt and watch the magic happen.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#" className="sr-only">
              Hidden for a11y
            </Link>
            <SignButtons />
          </div>
          <p className="text-sm text-muted-foreground">
            AI that turns your ideas into thumbnails 🎨
          </p>
        </div>
      </section>

      {/* Showcase */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          See what creators are making 🎬
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden border">
              <img
                src={`/youtube-thumbnail-preview-.png?height=360&width=640&query=YouTube thumbnail preview ${
                  i + 1
                }`}
                alt={`Example thumbnail ${i + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          Simple, creator-friendly pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <PricingCard title="Basic Pack" price="₹100" blurb="1 Image" />
          <PricingCard title="Starter Pack" price="₹700" blurb="10 Images" />
          <PricingCard
            title="Weekly Creator Pack"
            price="₹1500"
            blurb="30 Images"
            highlight
          />
        </div>
      </section>
    </div>
  );
}

function SignButtons() {
  // Buttons open the navbar modal; Provide quick links as well
  return (
    <div className="flex items-center gap-3">
      <Button
        className="bg-gradient-to-r from-blue-600 to-teal-500 text-white"
        onClick={() => {
          const evt = new CustomEvent("open-auth-modal");
          window.dispatchEvent(evt);
        }}
      >
        Sign up
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const evt = new CustomEvent("open-auth-modal");
          window.dispatchEvent(evt);
        }}
      >
        Sign in
      </Button>
    </div>
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
    <Card className={highlight ? "border-blue-600" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-semibold">{price}</p>
        <p className="text-muted-foreground">{blurb}</p>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          Start Creating 🚀
        </Button>
      </CardContent>
    </Card>
  );
}
