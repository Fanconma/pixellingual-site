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
        "block minecraft-card p-3 transition-all duration-300 hover:shadow-md transform hover:scale-[1.05]",
        isSelected ? "border-primary border-2" : "",
        className,
      )}
    >
      <div className="font-pixel text-center text-sm">{tag}</div>
    </Link>
  )
}

