import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import StarRating from "./star-rating"
import type { TranslationPack } from "@/data/translation-packs"
import { getPackStatus } from "@/data/translation-packs"
import { STUDIOS } from "@/data/translation-packs"

interface TranslationPackCardProps {
  pack: TranslationPack
  className?: string
  size?: "default" | "large"
}

const TranslationPackCard = memo(function TranslationPackCard({
  pack,
  className,
  size = "default",
}: TranslationPackCardProps) {
  const { isNew, isUpdated } = getPackStatus(pack)
  const studio = STUDIOS.find((studio) => studio.id === pack.studio);
  const studioName = studio ? studio.name : "未知工作室";

  // 所有非DLC徽章共用的基础样式
  const otherBadgeBaseClasses = "absolute z-20 font-pixel text-xs sm:text-sm font-bold px-3 py-1.5 shadow-lg border-2";

  return (
    <Link href={`/market/${pack.id}`} className={cn("group block", className)}>
      <div
        className={cn(
          "minecraft-card overflow-hidden rounded-lg",
          "border-2 border-gray-700 hover:border-primary transition-all duration-200",
          pack.isFeatured ? "border-secondary border-2" : "",
          size === "large" ? "w-80" : "w-full",
        )}
      >
        <div className="transform transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/50 relative z-[1] rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={pack.image || "/placeholder.svg"}
              alt={pack.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              sizes={size === "large" ? "320px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />

            {/* DLC 徽章: 恢复为悬停时渐变颜色变化的动画 */}
            {pack.isDLC && (
              // 这个外层 div 作为渐变“边框”的容器
              <div className={cn(
                "absolute top-3 left-3 p-[2px] rounded-lg overflow-hidden shadow-lg", // 定位、p-[2px]创建边框厚度、圆角、阴影
                "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500", // 默认的炫彩渐变背景 (作为边框)
                "transform rotate-[-3deg]", // 初始轻微旋转，增加设计感
                "transition-all duration-300 ease-out", // 所有属性平滑过渡
                // 悬停效果：渐变颜色变化、整体放大、旋转变直、阴影增强
                "group-hover:from-yellow-400 group-hover:via-green-400 group-hover:to-red-500", // 悬停时更鲜艳的渐变颜色
                "group-hover:scale-105 group-hover:rotate-0 group-hover:shadow-xl"
              )}>
                {/* 这个内层 div 是徽章的实际内容区域，拥有纯色背景 */}
                <div className={cn(
                  "flex items-center justify-center", // 居中文本
                  "bg-yellow-500 text-black", // 实心黄色背景 (DLC内容区域)
                  "font-pixel text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg", // 文本样式和内边距/形状
                  "group-hover:bg-yellow-400" // 悬停时内容区域背景微变
                )}>
                  DLC
                </div>
              </div>
            )}
        
            {/* 新 / 更新徽章: 互斥显示，放置在右上角 */}
            {isNew ? (
              <div className={cn(otherBadgeBaseClasses,
                "top-3 right-3", // 定位
                "bg-red-600 text-white border-red-800 rounded-full", // 样式：红色背景，白色文字，深红边框，圆形“药丸”
                "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" // 悬停动画：轻微放大和旋转
              )}>
                新
              </div>
            ) : isUpdated && (
              <div className={cn(otherBadgeBaseClasses,
                "top-3 right-3", // 定位
                "bg-blue-600 text-white border-blue-800 rounded-lg" // 样式：蓝色背景，白色文字，深蓝边框，圆角方块
              )}>
                更新
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-900">
            <h3 className="font-pixel text-xl text-white break-words mb-1">
              {pack.title}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-300">{studioName}</span>
              <div className="flex items-center transform-none">
                <StarRating rate={pack.rating} />
                <span className="text-sm font-medium text-primary ml-1">
                  {pack.price === 0 ? "免费" : `${pack.price} MC`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
})

export default TranslationPackCard