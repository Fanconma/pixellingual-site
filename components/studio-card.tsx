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
        "block minecraft-card p-6 transition-all duration-300 hover:shadow-md transform hover:scale-[1.05]",
        isSelected ? "border-primary border-2" : "",
        className,
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-2">
          <Image src={studio.logo || "/placeholder.svg"} alt={studio.name} fill className="object-contain pixelated" />
        </div>
        <div className="font-pixel text-center text-lg">{studio.name}</div>
      </div>
    </Link>
  )
}

