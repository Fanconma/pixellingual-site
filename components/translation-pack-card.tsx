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

  const badgeBaseClasses = "absolute z-20 font-pixel text-xs sm:text-sm font-bold px-2 py-1"

  return (
    <Link
      href={`/market/${pack.id}`}
      className={cn("group block h-full outline-none", className)}
    >
      {/* 
        主容器，实现“凹陷插槽”风格和固定高度：
        - 使用 flex-col 来控制内部布局，确保卡片能撑满父容器高度。
        - 背景色更深，并添加了微妙的噪点纹理，模拟游戏UI质感。
        - 使用多重 inset box-shadow 来创建凹陷的立体边框，效果比 border 好得多。
        - 悬停/特色状态：添加明亮的 outline 来模拟游戏中的“选中”效果，清晰且不影响布局。
      */}
      <div
        className={cn(
          "flex h-full flex-col bg-zinc-900", // h-full 确保卡片在 grid/flex 布局中等高
          "transition-all duration-200 ease-out",
          // 核心：使用 inset shadow 创建凹陷效果
          "shadow-[inset_2px_2px_0_rgba(0,0,0,0.4),_inset_-2px_-2px_0_rgba(255,255,255,0.1)]",
          // 悬停时阴影变深，立体感更强
          "group-hover:shadow-[inset_3px_3px_0_rgba(0,0,0,0.6),_inset_-3px_-3px_0_rgba(255,255,255,0.15)]",
          // 特色/悬停时的外发光边框
          pack.isFeatured && "outline outline-2 outline-yellow-400",
          "group-hover:outline group-hover:outline-2 group-hover:outline-white",
          size === "large" ? "w-80" : "w-full",
        )}
      >
        <div className="relative aspect-video flex-shrink-0 overflow-hidden">
          <Image
            src={pack.image || "/placeholder.svg"}
            alt={pack.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes={
              size === "large"
                ? "320px"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
          />

          {/* 徽章保持不变 */}
          {pack.isDLC && (
            <div className={cn(badgeBaseClasses, "top-2 left-2", "bg-purple-600 text-white", "outline outline-1 outline-black/50")}>
              DLC
            </div>
          )}
          {isNew ? (
            <div className={cn(badgeBaseClasses, "top-2 right-2", "bg-red-600 text-white", "outline outline-1 outline-black/50")}>
              新
            </div>
          ) : (
            isUpdated && (
              <div className={cn(badgeBaseClasses, "top-2 right-2", "bg-blue-600 text-white", "outline outline-1 outline-black/50")}>
                更新
              </div>
            )
          )}
        </div>

        {/* 
          信息面板 - 固定高度和文字溢出处理：
          - flex-grow 让此区域填充剩余空间。
          - 内部再用 flex 布局将标题推到顶部，作者和价格推到底部。
          - 标题使用 line-clamp 限制最多显示3行，超出部分显示...
          - 作者名称使用 truncate 单行截断。
        */}
        <div className="flex flex-grow flex-col justify-between p-3">
          {/* 标题部分 */}
          <h3 className="font-pixel text-lg text-white break-words shadow-black/75 [text-shadow:2px_2px_0_var(--tw-shadow-color)] line-clamp-3">
            {pack.title}
          </h3>
          {/* 底部信息 */}
          <div className="mt-2 flex items-center justify-between">
            <span className="truncate text-sm text-zinc-300 font-pixel shadow-black/75 [text-shadow:1px_1px_0_var(--tw-shadow-color)]" title={studioName}>
              {studioName}
            </span>
            <div className="flex flex-shrink-0 items-center">
              <StarRating rate={pack.rating} />
              <span className="font-pixel ml-2 text-sm font-bold text-yellow-400 shadow-black/75 [text-shadow:2px_2px_0_var(--tw-shadow-color)]">
                {pack.price === 0 ? "免费" : `${pack.price} MC`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default TranslationPackCard;