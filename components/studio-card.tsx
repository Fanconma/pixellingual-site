import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface StudioCardProps {
  studio: {
    id: string
    name: string
    logo: string
  }
  isSelected?: boolean
  className?: string
}

export default function StudioCard({ studio, isSelected = false, className }: StudioCardProps) {
  return (
    <Link
      href={`/market/studio/${studio.id}`}
      className={cn(
        "group block rounded-lg sm:rounded-xl p-3 sm:p-5 text-center",
        "border border-border/50 bg-card/60 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-primary/5 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(93,156,66,0.12)]",
        "hover:-translate-y-1",
        isSelected
          ? "border-primary bg-primary/10 shadow-[0_0_16px_rgba(93,156,66,0.2)]"
          : "",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div className={cn(
          "relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden",
          "ring-2 ring-border/30 transition-all duration-300",
          "group-hover:ring-primary/40 group-hover:shadow-[0_0_12px_rgba(93,156,66,0.2)]",
        )}>
          <Image src={studio.logo || "/placeholder.svg"} alt={studio.name} fill className="object-contain pixelated" />
        </div>
        <span className="font-pixel text-xs sm:text-base text-foreground/90 transition-colors duration-300 group-hover:text-primary truncate max-w-full">
          {studio.name}
        </span>
      </div>
    </Link>
  )
}

