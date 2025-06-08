"use client"

import { useState, useEffect, useRef, use } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import TranslationPackCard from "@/components/translation-pack-card"
import { ALL_PACKS } from "@/data/translation-packs"

interface PageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: PageProps) {
  const { tag } = use(params)
  const decodedTag = decodeURIComponent(tag)
  const [visiblePacks, setVisiblePacks] = useState(12)
  const [tagPacks, setTagPacks] = useState([])
  const packListRef = useRef<HTMLDivElement>(null)
  const formattedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  useEffect(() => {
    const filtered = ALL_PACKS.filter((pack) => pack.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase()))
    setTagPacks(filtered)

    // 设置页面标题
    document.title = `${formattedTag} 翻译 - PixelLingual`
  }, [decodedTag, formattedTag])

  // Handle infinite scroll
  const handleScroll = () => {
    if (!packListRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < tagPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 6, tagPacks.length))
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [tagPacks, visiblePacks])

  return (
        <>
      <Head>
        <title>{formattedTag}类翻译包 | PixelLingual像素语匠</title>
        <meta
          name="description"
          content={`浏览PixelLingual的${formattedTag}类别翻译包。找到适合您的高质量Minecraft中文翻译资源。`}
        />
        <meta
          name="keywords"
          content={`Minecraft ${formattedTag}翻译包, 中文${formattedTag}资源包, Minecraft基岩版翻译, ${formattedTag}中文本地化`}
        />
      </Head>
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${formattedTag} Maps`}
            alt={`${formattedTag} maps`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            回到市场
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{formattedTag}</span> 翻译包
            </h1>
            <p className="text-muted-foreground">浏览我们所有{formattedTag.toLowerCase()}的翻译包</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tagPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < tagPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 6, tagPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}

          {tagPacks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
              <p className="text-muted-foreground">
                我们无法找到任何带有标签"{formattedTag}"的翻译包
              </p>
              <Button asChild className="minecraft-btn mt-4">
                <Link href="/market">返回市场</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  )
}

