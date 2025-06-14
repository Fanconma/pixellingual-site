"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getActiveBanner, dismissBanner, type Banner } from "@/data/banners"
import { cn } from "@/lib/utils"

export default function TopBanner() {
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // 检查是否有活跃的横幅
    const banner = getActiveBanner()
    if (banner) {
      setCurrentBanner(banner)

      // 延迟显示以创建动画效果
      setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 500)

      // 如果设置了自动隐藏
      if (banner.autoHide && banner.autoHideDelay) {
        setTimeout(() => {
          handleDismiss(banner.id)
        }, banner.autoHideDelay)
      }
    }
  }, [])

  const handleDismiss = (bannerId: string) => {
    setIsAnimating(false)

    // 等待动画完成后隐藏
    setTimeout(() => {
      setIsVisible(false)
      dismissBanner(bannerId)
      setCurrentBanner(null)
    }, 300)
  }

  if (!currentBanner || !isVisible) {
    return null
  }

  const IconComponent = currentBanner.icon

  return (
    <div
      className={cn(
        "relative w-full border-b-4 transition-all duration-300 ease-in-out transform",
        currentBanner.backgroundColor,
        currentBanner.borderColor,
        isAnimating ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
      style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
          linear-gradient(-45deg, transparent 25%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.1) 75%)
        `,
        backgroundSize: "20px 20px, 20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      {/* 像素化装饰边框 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* 左侧内容 */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* 图标 */}
            {IconComponent && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 border-2 border-white/30 minecraft-card">
                  <IconComponent className={cn("w-5 h-5", currentBanner.textColor)} />
                </div>
              </div>
            )}

            {/* 文本内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h3 className={cn("font-pixel text-sm font-bold truncate", currentBanner.textColor)}>
                  {currentBanner.title}
                </h3>
                <p className={cn("text-xs opacity-90 truncate", currentBanner.textColor)}>{currentBanner.message}</p>
              </div>
            </div>
          </div>

          {/* 右侧按钮区域 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 了解更多按钮 */}
            {currentBanner.buttonText && currentBanner.buttonLink && (
              <Button
                asChild
                size="sm"
                className={cn(
                  "minecraft-btn text-xs px-3 py-1 h-auto bg-white/20 hover:bg-white/30 border-2 border-white/30",
                  currentBanner.textColor,
                )}
              >
                <Link href={currentBanner.buttonLink}>{currentBanner.buttonText}</Link>
              </Button>
            )}

            {/* 关闭按钮 */}
            {currentBanner.dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(currentBanner.id)}
                className={cn(
                  "w-8 h-8 p-0 hover:bg-white/20 border-2 border-transparent hover:border-white/30",
                  currentBanner.textColor,
                )}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">关闭横幅</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
}
