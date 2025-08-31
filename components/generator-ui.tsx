"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Eye,
  RefreshCw,
  Pencil,
  Clipboard,
  Download,
  GraduationCap,
  Clapperboard,
  Film,
  Sparkles,
  BookOpen,
  Cpu,
  Loader2,
} from "lucide-react";
import Image from "next/image";

type Domain = { label: string; icon: React.ReactNode };
type ApiImageResult = {
  idx: number;
  image?: string;
  error?: string;
};

const DOMAIN_OPTIONS: Domain[] = [
  { label: "Educator", icon: <GraduationCap className="size-4" /> },
  { label: "Entertainment", icon: <Clapperboard className="size-4" /> },
  { label: "Movies", icon: <Film className="size-4" /> },
  { label: "Anime", icon: <Sparkles className="size-4" /> },
  { label: "Information", icon: <BookOpen className="size-4" /> },
  { label: "Tech", icon: <Cpu className="size-4" /> },
];

const STYLE_OPTIONS = [
  "Ghibli Style",
  "Pixelated",
  "Ultra-Realistic",
  "Cartoonish",
  "Futuristic",
];

export function GeneratorUI() {
  const [refs, setRefs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);

  const [domains, setDomains] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [customStyle, setCustomStyle] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [wait, setWait] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // New state for follow-up popup
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async () => {
    if (prompt) {
      try {
        const res = await fetch("/api/ai-suggestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
        if (res.ok) {
          const result = await res.json();
          setSuggestions(result.suggestion);
          console.log(result.suggestion);
        } else {
          console.error("API call failed");
        }
      } catch (error) {
        console.error("Chat Completion :: AiSuggestion :: error ", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    return () => {
      refs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [refs]);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      followUpOpen;
    });
  }

  async function onUpload(files: FileList | null) {
    if (!files) return;
    const limited = Array.from(files).slice(0, 4);

    // For preview
    const previews = limited.map((f) => URL.createObjectURL(f));
    setRefs(previews);

    // For backend request: keep raw File objects
    setUploadedFiles(limited);
  }

  function openWizard() {
    setWizardOpen(true);
    fetchSuggestions();
  }

  function toggleArray(setter: (v: any) => void, arr: string[], value: string) {
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    setter(next);
  }

  // Instead of generating directly, open follow-up step
  function openFollowUp() {
    setWizardOpen(false);
    setWait(true);
    setTimeout(() => {
      setWait(false);
      setFollowUpOpen(true);
    }, 1000);
    // Mock LLM suggestions here (replace with API later)
    // setSuggestions([
    //   "Make it more vibrant with neon colors",
    //   "Focus on a cinematic close-up",
    //   "Add futuristic cyberpunk vibes",
    // ]);
  }

  function toggleSuggestion(s: string) {
    setSelectedSuggestions((prev) => {
      if (prev.includes(s)) {
        return prev.filter((x) => x !== s); // deselect
      }
      if (prev.length >= 3) {
        return prev; // do nothing if already 3 selected
      }
      return [...prev, s]; // add new
    });
  }

  async function generate() {
    try {
      setLoading(true);
      setFollowUpOpen(false);

      // Use FormData to send files + metadata
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("domains", JSON.stringify(domains));
      formData.append("styles", JSON.stringify(styles));
      formData.append("customStyle", customStyle);
      formData.append("suggestions", JSON.stringify(selectedSuggestions));

      uploadedFiles.forEach((file, idx) => {
        formData.append("images", file, file.name || `upload-${idx}.png`);
      });

      const res = await fetch("/api/image-generation", {
        method: "POST",
        body: formData, // don't set headers manually!
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data: { images: ApiImageResult[] } = await res.json();
      const imageUrls = data.images
        .filter((result) => result.image && !result.error)
        .map((result) => result.image!); // The '!' asserts that result.image is not undefined here

      // Set the state with the correctly formatted array of strings
      setImages(imageUrls);
      window.scrollBy({
        top: window.innerHeight * 0.01, // 1vh
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
      window.scrollBy({
        top: window.innerHeight * 1, // 1vh
        behavior: "smooth",
      });
    }
  }
  async function copyToClipboard(url: string) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
    } catch (err) {
      console.error("Failed to copy image: ", err);
    }
  }

  function downloadSelected() {
    const urls = images.filter((src) => selected[src]);
    urls.forEach((u, index) => {
      const a = document.createElement("a");
      a.href = u;
      a.download = `generated-thumbnail-${Date.now()}-${index}.png`;
      document.body.appendChild(a); // Append to body to ensure it works in all browsers
      a.click();
      document.body.removeChild(a); // Clean up after click
    });
  }

  return (
    <div className="grid gap-8">
      {/* Input section */}
      <Card className="rounded-2xl shadow-sm border-muted">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            ✨ Create a New Thumbnail
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Upload */}
          <label className="text-sm font-medium">Reference Images</label>
          {refs.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {refs.map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden border shadow-sm group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Reference ${i + 1}`}
                    className="w-full h-auto"
                  />
                  {/* Delete (X) button */}
                  <button
                    onClick={() =>
                      setRefs((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    aria-label={`Remove reference ${i + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {!refs.length && (
            <div className="grid gap-2">
              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-blue-500 transition cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => onUpload(e.currentTarget.files)}
                  className="w-full text-sm text-muted-foreground h-24 cursor-pointer"
                />
                <p className="text-xl text-muted-foreground mt-1 ">➕</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload up to 4 images
                </p>
              </div>
            </div>
          )}

          {/* Prompt */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Main Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your perfect thumbnail..."
              className="min-h-28 rounded-xl"
            />
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Your next viral video deserves the perfect thumbnail 🚀
            </p>
            <Button
              disabled={!prompt}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2.5 rounded-xl shadow hover:scale-105 transition"
              onClick={openWizard}
            >
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output toolbar */}
      {images.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Object.values(selected).filter(Boolean).length > 0 ? (
              <Badge variant="default" className="rounded-full px-3">
                {Object.values(selected).filter(Boolean).length} selected
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">
                Select images to download
              </span>
            )}
          </div>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={downloadSelected}
          >
            <Download className="size-4 mr-2" />
            Download selected
          </Button>
        </div>
      )}

      {/* Outputs */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <Checkbox
                checked={!!selected[src]}
                onCheckedChange={(v) =>
                  setSelected((s) => ({ ...s, [src]: !!v }))
                }
                className="absolute left-3 top-3 z-10 bg-background/90 rounded-sm h-5 w-5"
                aria-label={`Select image ${i + 1}`}
              />
              <Image
                src={src && src.trim() !== "" ? src : "/placeholder.svg"}
                alt={`Generated ${i}`}
                width={640}
                height={360}
                className="w-full h-auto transition group-hover:scale-[1.02]"
              />
              <TooltipProvider>
                <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <IconButton
                    tooltip="Preview"
                    onClick={() => setPreviewImage(src)}
                  >
                    <Eye className="size-4" />
                  </IconButton>
                  <IconButton
                    tooltip="Regenerate (reuse as reference)"
                    onClick={() => {
                      setRefs((prevRefs) => [src, ...prevRefs].slice(0, 4));
                    }}
                  >
                    <RefreshCw className="size-4" />
                  </IconButton>
                  <IconButton
                    tooltip="Edit / Follow-up"
                    onClick={() => alert("Paid Plan Sir 😁")}
                  >
                    <Pencil className="size-4" />
                  </IconButton>
                  <IconButton
                    tooltip="Copy link"
                    onClick={() => copyToClipboard(src)}
                  >
                    <Clipboard className="size-4" />
                  </IconButton>
                </div>
              </TooltipProvider>
            </div>
          ))}
        </div>
      )}

      {/* Wizard */}
      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              🪄 Step-by-Step Wizard
            </DialogTitle>
          </DialogHeader>

          {/* Step 1 */}
          <section className="grid gap-3">
            <h3 className="font-medium">Step 1 · Choose a Domain</h3>
            <div className="flex flex-wrap gap-2">
              {DOMAIN_OPTIONS.map((d) => {
                const active = domains.includes(d.label);
                return (
                  <button
                    key={d.label}
                    onClick={() => toggleArray(setDomains, domains, d.label)}
                    className={`px-3 py-2 rounded-lg text-sm border shadow-sm inline-flex items-center gap-1.5 transition ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-muted"
                    }`}
                  >
                    {d.icon}
                    <span>{d.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2 */}
          <section className="grid gap-3">
            <h3 className="font-medium">Step 2 · Pick a Style</h3>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((s) => {
                const active = styles.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleArray(setStyles, styles, s)}
                    className={`px-3 py-2 rounded-lg text-sm border shadow-sm transition ${
                      active
                        ? "bg-teal-500 text-white border-teal-500"
                        : "hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <Textarea
              placeholder="Custom style or extra details..."
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
              className="rounded-lg"
            />
          </section>

          {/* Step 3 */}
          <section className="grid gap-2">
            <h3 className="font-medium">Step 3 · Confirmation</h3>
            <p className="text-sm text-muted-foreground">
              All set? Let’s forge your thumbnails!
            </p>
          </section>

          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => setWizardOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow hover:scale-105 transition"
              onClick={openFollowUp}
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Loading screen */}
      <AnimatePresence>{wait && <LoadingScreen />}</AnimatePresence>

      {/* Follow-up Popup */}
      <AnimatePresence>
        {followUpOpen && (
          <Dialog open={followUpOpen} onOpenChange={setFollowUpOpen}>
            <DialogContent className="max-w-md rounded-2xl overflow-hidden">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="p-4 space-y-4"
              >
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    🤖 AI Suggestions
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-2">
                  {suggestions.map((s, i) => {
                    const active = selectedSuggestions.includes(s);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleSuggestion(s)}
                        className={`text-left px-3 py-2 rounded-lg border transition ${
                          active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-muted"
                        }`}
                      >
                        {s}
                        {active && (
                          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-muted-foreground">
                  {selectedSuggestions.length}/3 selected
                </p>

                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={generate}
                    className="rounded-lg"
                  >
                    Skip and Generate
                  </Button>
                  <Button
                    disabled={selectedSuggestions.length === 0}
                    onClick={generate}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg"
                  >
                    Use Selected ({selectedSuggestions.length})
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl p-2">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <Image
              src={previewImage}
              alt="Generated image preview"
              width={1280}
              height={720}
              className="w-full h-auto rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
      <LoadingOverlay loading={loading} />
    </div>
  );
}

function IconButton({
  children,
  tooltip,
  onClick,
}: {
  children: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-background/80 border shadow-sm backdrop-blur hover:bg-background transition cursor-pointer"
          aria-label={tooltip}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function LoadingScreen() {
  return (
    <Dialog open>
      <DialogContent className="max-w-md rounded-2xl flex flex-col items-center justify-center gap-4 py-10">
        <VisuallyHidden>
          <DialogTitle>Upload Images</DialogTitle>
        </VisuallyHidden>
        <Loader2 className="size-8 text-blue-600 animate-spin" />
        <p className="text-sm text-muted-foreground">
          Preparing AI suggestions...
        </p>
      </DialogContent>
    </Dialog>
  );
}
