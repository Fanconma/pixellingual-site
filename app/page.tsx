import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Globe, Users, Heart, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getMostRecentPacks } from "@/data/translation-packs"
import TranslationPackCard from "@/components/translation-pack-card"
import { fetchDonors } from "@/lib/afdian"
import { Donor } from "@/types/donor"

export default async function Home() {
  const recentPacks = getMostRecentPacks(3)
  let donors: Donor[] = []
  try {
    donors = await fetchDonors()
  } catch (e) {
    console.error("Error fetching donors:", e)
  }
  donors.sort((a, b) => b.amount - a.amount)
  const topDonors = donors.slice(0, 3)
  const otherDonors = donors.slice(3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* ───── Hero Section ───── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cozy-cottage.jpeg"
            alt="Minecraft landscape"
            fill
            className="object-cover opacity-15"
            priority
            rel="preload"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        {/* Decorative floating pixels */}
        <div className="absolute left-[10%] top-[20%] h-3 w-3 rounded-sm bg-primary/30 animate-float" />
        <div className="absolute right-[15%] top-[30%] h-2 w-2 rounded-sm bg-secondary/30 animate-float-delayed" />
        <div className="absolute left-[20%] bottom-[25%] h-4 w-4 rounded-sm bg-primary/20 animate-float-delayed" />
        <div className="absolute right-[25%] bottom-[20%] h-2.5 w-2.5 rounded-sm bg-secondary/20 animate-float" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            {/* Subtitle pill */}
            <div className="animate-slide-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-pixel text-xs text-primary">Minecraft 基岩版翻译计划</span>
            </div>

            <h1 className="animate-slide-up text-4xl md:text-5xl lg:text-6xl font-pixel tracking-tight text-balance" style={{ animationDelay: "0.1s" }}>
              <span className="text-primary">像素语匠</span>
              <br />
              <span className="text-foreground">PixelLingual</span>
              <br />
              <span className="mt-2 block text-2xl md:text-3xl text-muted-foreground">用文字塑造世界</span>
            </h1>

            <p className="animate-slide-up mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed" style={{ animationDelay: "0.2s" }}>
              一个为爱发电的 Minecraft 基岩版市场地图翻译计划。
            </p>

            <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="rounded-xl bg-primary px-8 py-3 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]">
                <Link href="/market" className="flex items-center gap-2">
                  浏览翻译包
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-border/50 font-pixel backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5">
                <Link href="/join-us">了解更多</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Features Section ───── */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-primary" />
            <h2 className="text-3xl font-pixel mb-4 text-balance">什么是 PixelLingual?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              PixelLingual(像素语匠)是专门翻译 Minecraft 基岩版市场地图的工作室。市场中大多数除教育地图以外的地图都不包含中文翻译。为了让更多国内玩家更好的了解优秀的 Minecraft 作品，我们来翻译，让玩家更好的游玩地图。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                color: "primary",
                title: "准确的翻译",
                desc: "大多数的翻译作品由翻译作者人工翻译，并非使用机器翻译(MT)或大语言模型(LLM)复制粘贴。但有些作品翻译会参考 LLM 和 MT 给出的建议。",
              },
              {
                icon: Download,
                color: "secondary",
                title: "免费下载",
                desc: "大多数翻译包是出于对英语的兴趣所翻译的，因此我们提供大多数翻译包免费下载，让更多的玩家用中文体验市场地图！",
              },
              {
                icon: Users,
                color: "primary",
                title: "社区驱动",
                desc: "我们欢迎更多的玩家加入我们的翻译阵营，或提供一些翻译的改进建议并帮助我们扩大翻译内容的集合！",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),_0_0_20px_rgba(93,156,66,0.08)]"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color === "secondary" ? "bg-secondary/15" : "bg-primary/15"} transition-colors duration-300 group-hover:bg-primary/20`}>
                    <Icon className={`h-6 w-6 ${feature.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                  </div>
                  <h3 className="font-pixel text-xl mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───── Recent Translations Section ───── */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-primary" />
              <h2 className="text-3xl font-pixel text-foreground">浏览汉化包</h2>
            </div>
            <Button asChild variant="ghost" className="group gap-1 font-pixel text-muted-foreground transition-colors hover:text-primary">
              <Link href="/market">
                查看全部
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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

      {/* ───── Supporters Section ───── */}
      <section className="py-20 md:py-24">
        <div className="container text-center">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-primary" />
          <h2 className="text-3xl font-pixel mb-4">我们的支持者</h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground leading-relaxed">
            非常感谢这些出色的支持者，他们向为爱发电的翻译者们提供了无限的动力！情谊如灯，照亮彼此前行的路，这正是支持的真谛所在。感谢你们！！！
          </p>

          {/* Top Supporters */}
          <div className="mb-10">
            <h3 className="mb-6 flex items-center justify-center gap-2 font-pixel text-lg text-foreground">
              <Heart className="h-5 w-5 text-primary" />
              Community Supporters
            </h3>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
              {topDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="group flex gap-4 rounded-xl border border-border/40 bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(93,156,66,0.1)]"
                >
                  <div className="flex-shrink-0">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-border/40 transition-all duration-300 group-hover:ring-primary/40">
                      <Image src={donor.avatar || "/placeholder.svg"} alt={donor.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-pixel text-base text-foreground">{donor.name}</h4>
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {'\u00A5'}{donor.amount}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{donor.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Supporters */}
          {otherDonors.length > 0 && (
            <div className="mx-auto max-w-4xl rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-3">
                {otherDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex items-center gap-1.5 rounded-full border border-border/30 bg-primary/5 px-3 py-1 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10"
                  >
                    <span className="font-pixel text-sm text-foreground/80">{donor.name}</span>
                    <span className="text-xs font-medium text-primary">{'\u00A5'}{donor.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Button asChild className="rounded-xl bg-primary px-8 py-3 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]">
              <Link href="/donate" className="flex items-center gap-2">
                成为支持者
                <Heart className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ───── CTA Section ───── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute left-[5%] top-[30%] h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-[10%] bottom-[20%] h-24 w-24 rounded-full bg-secondary/5 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-pixel text-foreground text-balance">准备好用中文玩市场包了吗？</h2>
            <p className="mx-auto max-w-lg text-muted-foreground leading-relaxed">
              浏览我们高质量的翻译包集合并立即开始用中文玩 Minecraft 市场包。
            </p>
            <Button asChild size="lg" className="rounded-xl bg-primary px-8 py-3 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]">
              <Link href="/market" className="flex items-center gap-2">
                立即探索全部汉化包
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
