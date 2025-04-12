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

export default function TranslationPackCard({ pack, className, size = "default" }: TranslationPackCardProps) {
  const { isNew, isUpdated } = getPackStatus(pack)
  const studio = STUDIOS.find((studio) => studio.id === pack.studio);
  return (
    <Link href={`/market/${pack.id}`} className={cn("group block", className)}>
      <div
        className={cn(
          "minecraft-card overflow-hidden transition-all duration-300 group-hover:shadow-xl transform group-hover:scale-[1.02]",
          pack.isFeatured ? "border-secondary border-2" : "",
          size === "large" ? "w-80" : "w-full",
        )}
      >
        <div className="relative aspect-video">
          <Image
            src={pack.image || "/placeholder.svg"}
            alt={pack.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* DLC Label */}
          {pack.isDLC && <div className="absolute top-0 left-0 bg-yellow-500 text-black font-pixel px-4 py-1">DLC</div>}

          {isNew && (
            <div className="absolute top-2 right-2">
              <span className="tag-pill">新</span>
            </div>
          )}

          {!isNew && isUpdated && (
            <div className="absolute top-2 right-2">
              <span className="tag-pill bg-blue-600">更新</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-900">
          <h3 className="font-pixel text-lg text-white break-words">{pack.title}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">{studio.name}</span>
            <div className="flex items-center ">
              <StarRating rate={pack.rating}  />
              <span className="text-xs font-medium text-gray-400">
                {pack.price === 0 ? "免费" : `${pack.price} MC`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

