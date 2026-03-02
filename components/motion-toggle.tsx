"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Zap, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "motion-level";

/**
 * 3-level motion system:
 *  "full"    -> all animations & transitions active
 *  "reduced" -> simplified transitions, no looping/decorative animations
 *  "off"     -> no animations, no transitions
 */
type MotionLevel = "full" | "reduced" | "off";

const LEVEL_ORDER: MotionLevel[] = ["full", "reduced", "off"];

const LEVEL_CONFIG: Record<
  MotionLevel,
  { label: string; desc: string; icon: typeof Sparkles; dotColor: string }
> = {
  full: {
    label: "完整动效",
    desc: "所有动画和过渡效果已启用",
    icon: Sparkles,
    dotColor: "bg-primary",
  },
  reduced: {
    label: "减弱动效",
    desc: "仅保留基础过渡，关闭循环动画",
    icon: Zap,
    dotColor: "bg-yellow-500",
  },
  off: {
    label: "关闭动效",
    desc: "所有动画和过渡均已禁用",
    icon: ZapOff,
    dotColor: "bg-muted-foreground",
  },
};

function getSystemPreference(): MotionLevel {
  if (typeof window === "undefined") return "full";
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mql.matches ? "reduced" : "full";
}

export default function MotionToggle() {
  const [level, setLevel] = useState<MotionLevel>("full");
  const [mounted, setMounted] = useState(false);

  // Init from storage or system preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MotionLevel | null;
    if (stored && LEVEL_ORDER.includes(stored)) {
      setLevel(stored);
    } else {
      setLevel(getSystemPreference());
    }
    setMounted(true);
  }, []);

  // Apply classes on <html>
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;

    // Remove all motion classes first
    html.classList.remove("motion-full", "motion-reduced", "motion-off");
    // Also remove legacy class
    html.classList.remove("reduce-motion");

    // Apply the active level class
    html.classList.add(`motion-${level}`);

    // For "off" mode, also add the legacy class for backward compat
    if (level === "off") {
      html.classList.add("reduce-motion");
    }

    localStorage.setItem(STORAGE_KEY, level);
  }, [level, mounted]);

  const cycle = useCallback(() => {
    setLevel((prev) => {
      const idx = LEVEL_ORDER.indexOf(prev);
      return LEVEL_ORDER[(idx + 1) % LEVEL_ORDER.length];
    });
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0" aria-hidden>
        <Sparkles className="h-5 w-5" />
      </Button>
    );
  }

  const config = LEVEL_CONFIG[level];
  const Icon = config.icon;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycle}
            className="relative"
            aria-label={`动效模式: ${config.label}`}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                level === "full" && "text-primary",
                level === "reduced" && "text-yellow-500",
                level === "off" && "text-muted-foreground"
              )}
            />
            {/* Indicator dot */}
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background transition-colors duration-200",
                config.dotColor
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-[200px] text-center"
        >
          <p className="font-pixel text-xs font-bold">{config.label}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            {config.desc}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
