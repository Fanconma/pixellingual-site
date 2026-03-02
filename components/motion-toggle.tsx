"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STORAGE_KEY = "reduce-motion";

export default function MotionToggle() {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialise from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setReduced(stored === "true");
    } else {
      // Respect OS-level prefers-reduced-motion
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mql.matches);
    }
    setMounted(true);
  }, []);

  // Apply / remove the class on <html> whenever the state changes
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (reduced) {
      html.classList.add("reduce-motion");
      html.style.setProperty("--motion-duration", "0s");
    } else {
      html.classList.remove("reduce-motion");
      html.style.removeProperty("--motion-duration");
    }
    localStorage.setItem(STORAGE_KEY, String(reduced));
  }, [reduced, mounted]);

  const toggle = useCallback(() => setReduced((prev) => !prev), []);

  if (!mounted) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="relative animate-fade-in"
            aria-label={reduced ? "启用动画" : "关闭动画"}
          >
            {reduced ? (
              <ZapOff className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            {/* Small indicator dot when animations are off */}
            {reduced && (
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-yellow-500" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-pixel text-xs">
          {reduced ? "动画已关闭 - 点击启用" : "点击关闭动画"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
