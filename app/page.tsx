import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Globe, Users } from "lucide-react"
import { getMostRecentPacks } from "@/data/translation-packs"
import TranslationPackCard from "@/components/translation-pack-card"

export default function Home() {
  // Get the three most recent translation packs
  const recentPacks = getMostRecentPacks(3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cozy-cottage.png"
            alt="Minecraft landscape"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel tracking-tight">
              <span className="text-primary">Minecraft</span><br/>像素语匠<br/>PixelLingual
              <br /><br />
              <span className="text-secondary">一个MC汉化工作室</span>
            </h1>
            <p className="text-xl text-muted-foreground">
            一个为爱发电的Minecraft基岩版市场地图翻译计划。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="minecraft-btn">
                <Link href="/market" className="flex items-center">
                  <span>浏览翻译包<ArrowRight className="ml-2 h-4 w-4" /></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">了解更多</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-pixel mb-4">什么是 PixelLingual?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              PixelLingual(像素语匠)是专门翻译 Minecraft 基岩版市场地图的工作室。市场中大多数除教育地图以外的地图都不包含中文翻译。为了让更多国内玩家更好的了解优秀的 Minecraft 作品，我们来翻译，让玩家更好的游玩地图。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-pixel text-xl">较准确的翻译</h3>
              <p className="text-muted-foreground">
                大多数的翻译作品由翻译作者人工翻译，并非使用机器翻译(MT)或大语言模型(LLM)复制粘贴。但有些作品翻译会参考 LLM 和 MT 给出的建议。
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Download className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-pixel text-xl">免费下载</h3>
              <p className="text-muted-foreground">
                大多数翻译包是出于对英语的兴趣所翻译的，因此我们提供大多数翻译包免费下载，让更多的玩家用中文体验市场地图！
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-pixel text-xl">社区驱动</h3>
              <p className="text-muted-foreground">
                我们欢迎更多的玩家加入我们的翻译阵营，或提供一些翻译的改进建议并帮助我们扩大翻译内容的集合！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Translations Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-pixel">浏览汉化包</h2>
            <Button asChild variant="link" className="font-pixel">
              <Link href="/market">
                查看全部
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPacks.map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-pixel">准备好增强你的 Minecraft 体验了吗？</h2>
            <p className="text-muted-foreground">
            浏览我们高质量的翻译包集合并立即开始用中文玩 Minecraft。
            </p>
            <Button asChild size="lg" className="minecraft-btn">
              <Link href="/market">
                立刻探索全部汉化包
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

