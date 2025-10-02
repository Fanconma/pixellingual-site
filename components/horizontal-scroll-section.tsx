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
    <div className={cn("relative px-4 sm:px-6 lg:px-8", className)}>
      {title && (
        // 标题、描述和“查看全部”按钮的布局容器
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* 调整标题字体大小 */}
            <h2 className="text-xl md:text-2xl font-pixel mb-2">{title}</h2>
            {/* 调整描述字体大小 */}
            {description && <p className="text-muted-foreground text-base">{description}</p>}
          </div>
          {viewAllHref && (
            // “查看全部”按钮在手机端（flex-col 模式下）左对齐并占据全宽
            <Button
              asChild
              className="minecraft-btn mt-6 sm:mt-0 px-6 py-3 text-base w-full sm:w-auto self-start sm:self-auto"
            >
              <Link href={viewAllHref}>查看全部</Link>
            </Button>
          )}
        </div>
      )}

      <div className="relative">
        {/* 左侧滚动按钮 - 样式优化，确保箭头颜色可见 */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -left-4 top-1/2 -translate-y-1/2 z-10",
            "bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 rounded-md",
            "hover:bg-gray-700/90 hover:border-primary transition-colors duration-200",
            "shadow-md text-white" // <-- 明确设置图标颜色为白色
          )}
          onClick={() => scroll("left")}
        >
          <div>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">向左滚动</span>
          </div>
        </Button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-2"
          style={{ willChange: "transform" }}
        >
          <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
            {React.Children.map(children, (child, index) => (
              <div key={index} className="isolate">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧滚动按钮 - 样式优化，确保箭头颜色可见 */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -right-4 top-1/2 -translate-y-1/2 z-10",
            "bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 rounded-md",
            "hover:bg-gray-700/90 hover:border-primary transition-colors duration-200",
            "shadow-md text-white" // <-- 明确设置图标颜色为白色
          )}
          onClick={() => scroll("right")}
        >
          <div>
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">向右滚动</span>
          </div>
        </Button>
      </div>
    </div>
  )
}