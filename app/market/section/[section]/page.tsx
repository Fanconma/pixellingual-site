"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import TranslationPackCard from "@/components/translation-pack-card"
import { getPacksBySectionId, getSectionTitleById } from "@/data/translation-packs"

interface PageProps {
  params: {
    section: string
  }
}

export default function SectionPage({ params }: PageProps) {
  const { section } = params
  const [visiblePacks, setVisiblePacks] = useState(18)
  const [sectionPacks, setSectionPacks] = useState([])
  const [sectionTitle, setSectionTitle] = useState("")
  const packListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get section title
    const title = getSectionTitleById(section)
    setSectionTitle(title)

    // Get packs for this section
    const packs = getPacksBySectionId(section)
    setSectionPacks(packs)
  }, [section])

  // Handle infinite scroll
  const handleScroll = () => {
    if (!packListRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < sectionPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 12, sectionPacks.length))
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionPacks, visiblePacks])

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${sectionTitle}`}
            alt={`${sectionTitle} translations`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Market
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{sectionTitle}</span>
            </h1>
            <p className="text-muted-foreground">浏览本部分中的所有翻译</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sectionPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < sectionPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 12, sectionPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}

          {sectionPacks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
              <p className="text-muted-foreground">
                我们无法在 "{sectionTitle}" 部分找到任何翻译包
              </p>
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

