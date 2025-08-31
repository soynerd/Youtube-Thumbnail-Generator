"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="shrink-0"
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}
