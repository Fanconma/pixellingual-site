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
  return (
    <Link href={`/market/${pack.id}`} className={cn("group block", className)}>
      <div
        className={cn(
          "minecraft-card overflow-hidden",
          pack.isFeatured ? "border-secondary border-2" : "",
          size === "large" ? "w-80" : "w-full",
        )}
      >        {/* 使用内部容器进行缩放，而不是整个卡片 */}
        <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative aspect-video">
          <Image
            src={pack.image || "/placeholder.svg"}
            alt={pack.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes={size === "large" ? "320px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          />

            {/* DLC Label - 现在不会随着卡片缩放而变形 */}
            {pack.isDLC && (
              <div className="absolute top-0 left-0 bg-yellow-500 text-black font-pixel px-4 py-1 z-10 transform-none">
                DLC
              </div>
            )}
      

          {isNew && (
            <div className="absolute top-2 right-2 z-10 transform-none">
              <span className="tag-pill">新</span>
            </div>
          )}

          {!isNew && isUpdated && (
            <div className="absolute top-2 right-2 z-10 transform-none">
              <span className="tag-pill bg-blue-600">更新</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-900">
          <h3 className="font-pixel text-lg text-white break-words">{pack.title}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">{studio.name}</span>
            <div className="flex items-center transform-none">
              <StarRating rate={pack.rating}  />
              <span className="text-xs font-medium text-gray-400">
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
