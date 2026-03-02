"use client"

import React, { useRef, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { throttle } from "@/lib/performance"

interface HorizontalScrollSectionProps {
  title?: string
  description?: string
  viewAllHref?: string
  className?: string
  children: React.ReactNode
}

export default function HorizontalScrollSection({
  title,
  description,
  viewAllHref,
  className,
  children,
}: HorizontalScrollSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback(
    throttle((direction: "left" | "right") => {
      if (!scrollContainerRef.current) return

      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.7 + 16; 

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }, 300),
    [],
  )

  return (
    <div className={cn("relative px-0 sm:px-6 lg:px-8", className)}>
      {title && (
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-5 sm:h-6 w-1 rounded-full bg-primary" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-pixel">{title}</h2>
            </div>
            {description && <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-4 sm:ml-0">{description}</p>}
          </div>
          {viewAllHref && (
            <Button
              asChild
              className="rounded-lg bg-primary/10 px-4 py-2 font-pixel text-sm text-primary transition-colors duration-200 hover:bg-primary/20 w-full sm:w-auto"
            >
              <Link href={viewAllHref}>查看全部</Link>
            </Button>
          )}
        </div>
      )}

      <div className="relative group/scroll">
        {/* Left scroll button - hidden on mobile, visible on hover for desktop */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-10",
            "hidden sm:flex",
            "h-10 w-10 rounded-full",
            "bg-background/80 dark:bg-card/80 backdrop-blur-md",
            "border border-border/50",
            "text-foreground shadow-lg",
            "opacity-0 group-hover/scroll:opacity-100",
            "transition-all duration-300 motion-reduce:transition-none",
            "hover:bg-primary/10 hover:border-primary/40 hover:text-primary",
          )}
          onClick={() => scroll("left")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">向左滚动</span>
        </Button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-4 sm:px-2 snap-x snap-mandatory sm:snap-none"
          style={{ willChange: "transform" }}
        >
          <div className="flex gap-3 sm:gap-4" style={{ minWidth: "max-content" }}>
            {React.Children.map(children, (child, index) => (
              <div key={index} className="isolate snap-start">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-10",
            "hidden sm:flex",
            "h-10 w-10 rounded-full",
            "bg-background/80 dark:bg-card/80 backdrop-blur-md",
            "border border-border/50",
            "text-foreground shadow-lg",
            "opacity-0 group-hover/scroll:opacity-100",
            "transition-all duration-300 motion-reduce:transition-none",
            "hover:bg-primary/10 hover:border-primary/40 hover:text-primary",
          )}
          onClick={() => scroll("right")}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">向右滚动</span>
        </Button>
      </div>
    </div>
  )
}
