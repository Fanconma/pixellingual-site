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
  const studio = STUDIOS.find((studio) => studio.id === pack.studio)
  const studioName = studio ? studio.name : "未知工作室"

  const badgeBaseClasses =
    "absolute z-20 font-pixel text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm"

  return (
    <Link
      href={`/market/${pack.id}`}
      className={cn("group block h-full outline-none", className)}
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl",
          "border bg-card/70 backdrop-blur-sm",
          "transition-all duration-300 ease-out",
          "shadow-sm",
          "group-hover:-translate-y-1.5",
          "group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),_0_0_20px_rgba(93,156,66,0.1)]",
          "group-hover:border-primary/30",
          pack.isFeatured
            ? [
                "border-yellow-500/70 dark:border-yellow-500/50",
                "shadow-[0_0_20px_rgba(234,179,8,0.2)] dark:shadow-[0_0_16px_rgba(234,179,8,0.15)]",
                "ring-1 ring-yellow-400/30",
                "group-hover:shadow-[0_0_32px_rgba(234,179,8,0.35),_0_8px_30px_rgba(0,0,0,0.3)]",
                "group-hover:border-yellow-400/80",
              ]
            : "border-border/40",
          size === "large" ? "w-80" : "w-full",
        )}
      >
        {/* Featured top accent line */}
        {pack.isFeatured && (
          <div className="absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-yellow-500/0 via-yellow-400 to-yellow-500/0" />
        )}

        {/* Image */}
        <div className="relative aspect-video flex-shrink-0 overflow-hidden">
          <Image
            src={pack.image || "/placeholder.svg"}
            alt={pack.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
            sizes={
              size === "large"
                ? "320px"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
          />
          {/* Bottom gradient for text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

          {/* DLC Badge with hover glow */}
          {pack.isDLC && (
            <div
              className={cn(
                badgeBaseClasses,
                "top-2.5 left-2.5",
                "bg-purple-600/90 text-white shadow-lg shadow-purple-900/30",
                "transition-all duration-500 ease-out",
                "group-hover:shadow-[0_0_16px_rgba(147,51,234,0.6),_0_0_32px_rgba(147,51,234,0.3)]",
                "group-hover:bg-purple-500/95 group-hover:scale-105",
                "animate-dlc-glow",
              )}
            >
              DLC
            </div>
          )}

          {/* New / Updated badges */}
          {isNew ? (
            <div
              className={cn(
                badgeBaseClasses,
                "top-2.5 right-2.5",
                "bg-red-500/90 text-white shadow-lg shadow-red-900/30",
              )}
            >
              NEW
            </div>
          ) : (
            isUpdated && (
              <div
                className={cn(
                  badgeBaseClasses,
                  "top-2.5 right-2.5",
                  "bg-blue-500/90 text-white shadow-lg shadow-blue-900/30",
                )}
              >
                UPD
              </div>
            )
          )}

          {/* Featured ribbon */}
          {pack.isFeatured && (
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-md bg-yellow-500/90 px-2 py-0.5 font-pixel text-[10px] font-bold text-yellow-950 shadow-lg backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(234,179,8,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FEATURED
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="flex flex-grow flex-col justify-between gap-2 p-3.5">
          <h3 className="font-pixel text-base leading-snug text-foreground line-clamp-2 transition-colors duration-300 group-hover:text-primary">
            {pack.title}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <span
              className="truncate font-pixel text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70"
              title={studioName}
            >
              {studioName}
            </span>
            <div className="flex flex-shrink-0 items-center gap-1.5">
              <StarRating rate={pack.rating} />
              <span
                className={cn(
                  "font-pixel text-xs font-bold rounded-md px-2 py-0.5",
                  pack.price === 0
                    ? "bg-primary/15 text-primary"
                    : "bg-yellow-500/15 text-yellow-400",
                )}
              >
                {pack.price === 0 ? "FREE" : `${pack.price} MC`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default TranslationPackCard;
