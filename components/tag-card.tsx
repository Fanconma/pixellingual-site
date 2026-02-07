import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagCardProps {
  tag: string
  isSelected?: boolean
  className?: string
}

export default function TagCard({ tag, isSelected = false, className }: TagCardProps) {
  return (
    <Link
      href={`/market/tag/${tag.toLowerCase()}`}
      className={cn(
        "group block rounded-lg px-4 py-3 text-center",
        "border border-border/50 bg-card/60 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-primary/10 hover:border-primary/40 hover:shadow-[0_0_16px_rgba(93,156,66,0.15)]",
        "hover:-translate-y-0.5",
        isSelected
          ? "border-primary bg-primary/15 shadow-[0_0_12px_rgba(93,156,66,0.2)]"
          : "",
        className,
      )}
    >
      <span className={cn(
        "font-pixel text-sm text-foreground/80 transition-colors duration-300",
        "group-hover:text-primary",
        isSelected && "text-primary font-bold"
      )}>
        {tag}
      </span>
    </Link>
  )
}

