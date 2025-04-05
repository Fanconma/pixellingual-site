"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import TranslationPackCard from "@/components/translation-pack-card"
import { ALL_PACKS, getStudioById } from "@/data/translation-packs"

interface PageProps {
  params: {
    studio: string
  }
}

export default function StudioPage({ params }: PageProps) {
  const { studio } = params
  const [visiblePacks, setVisiblePacks] = useState(18)
  const [studioPacks, setStudioPacks] = useState([])
  const [studioInfo, setStudioInfo] = useState(null)
  const packListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Find studio info
    const foundStudio = getStudioById(studio)

    if (foundStudio) {
      setStudioInfo(foundStudio)

      // Filter packs by studio
      const filtered = ALL_PACKS.filter((pack) => pack.studio === foundStudio.name)

      setStudioPacks(filtered)
    }
  }, [studio])

  // Handle infinite scroll
  const handleScroll = () => {
    if (!packListRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < studioPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 12, studioPacks.length))
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [studioPacks, visiblePacks])

  // Format studio name for display
  const formattedStudio = studioInfo
    ? studioInfo.name
    : studio.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${formattedStudio}`}
            alt={`${formattedStudio} translations`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回市场
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            {studioInfo && (
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={studioInfo.logo || "/placeholder.svg"}
                    alt={studioInfo.name}
                    fill
                    className="object-contain pixelated"
                  />
                </div>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{formattedStudio}</span> Translations
            </h1>
            <p className="text-muted-foreground">浏览全部为 {formattedStudio} 地图工作室所创作的翻译包</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {studioPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < studioPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 12, studioPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}

          {studioPacks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-pixel mb-2">未找到工作室（工作室详情页仍未完工，敬请期待）</h3>
              <p className="text-muted-foreground">我们无法找到任何为 "{formattedStudio}" 工作室所创作的翻译包，也许工作室已改名或不存在？</p>
              <Button asChild className="minecraft-btn mt-4">
                <Link href="/market">返回市场</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

