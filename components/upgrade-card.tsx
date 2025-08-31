import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function UpgradeCard() {
  return (
    <Link
      href="/payment"
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
    >
      <Card className="relative overflow-hidden border border-slate-200 transition-all rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500">
        {/* Subtle gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 via-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <CardContent className="relative px-6 py-2 flex items-center justify-between">
          <div>
            <p className="text-base font-medium">
              Unlock more with <span className="text-blue-600">Pro</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Get unlimited access and premium features
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition">
            Upgrade <ArrowRight className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
