import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Globe, Users, Heart } from "lucide-react"
import { getMostRecentPacks } from "@/data/translation-packs"
import TranslationPackCard from "@/components/translation-pack-card"
import { fetchDonors } from "@/lib/afdian"
import { Donor } from "@/types/donor"

export default async function Home() {
  // Get the three most recent translation packs
  const recentPacks = getMostRecentPacks(3)
  // 获取顶级支持者（钻石和黄金等级）
    let donors: Donor[] = []
  try {
    donors = await fetchDonors()
  } catch (e) {
    console.error("获取爱发电数据失败:", e)
  }
  donors.sort((a, b) => b.amount - a.amount);
  // 获取前3名赞助者（金额最高）
  const topDonors = donors.slice(0, 3)

  // 获取其他赞助者
  const otherDonors = donors.slice(3)
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cozy-cottage.jpeg"
            alt="Minecraft landscape"
            fill
            className="object-cover opacity-20 h-1800 w-full"
            priority
            rel="preload"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel tracking-tight">
              <span className="text-primary">像素语匠</span><br/> PixelLingual
              <br /><br />
              <span className="text-secondary">一个MC汉化工作室</span>
            </h1>
            <p className="text-xl text-muted-foreground">
            一个为爱发电的Minecraft基岩版市场地图翻译计划。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="minecraft-btn">
                <Link href="/market" className="flex items-center">
                  <span className="flex items-center"><span>浏览翻译包</span><ArrowRight className="ml-2 h-4 w-4" /></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/join-us">了解更多</Link>
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
              <span className="flex items-center">
                  <span>查看全部</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
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
      {/* Our Supporters Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-8 text-center">我们的支持者</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            非常感谢这些出色的支持者，他们向为爱发电的翻译者们提供了无限的动力！情谊如灯，照亮彼此前行的路，这正是支持的真谛所在。感谢你们！！！
            </p>
<br />
          {/* Top Supporters */}
          <div className="mb-10">
            <h3 className="text-xl font-pixel mb-4 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary mr-2" /> Community Supporters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topDonors.map((donor) => (
                <div key={donor.id} className="minecraft-card p-4 flex gap-4 border-primary/50">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={donor.avatar || "/placeholder.svg"} alt={donor.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className="font-pixel text-lg">{donor.name}</h4>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        ￥{donor.amount}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{donor.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Supporters - Only show names */}
          <div>
            <div className="minecraft-card p-6 max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
              {otherDonors.map((donor) => (
                  <div key={donor.id} className="px-3 py-1 bg-primary/10 rounded-full flex items-center">
                    <span className="font-pixel text-sm">{donor.name}</span>
                    <span className="text-xs text-primary ml-2">${donor.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild className="minecraft-btn">
              <Link href="/donate">
              <span className="flex items-center">成为支持者
                <Heart className="ml-2 h-4 w-4" /></span>
              </Link>
            </Button>
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
              <span className="flex items-center">
                  <span>立即探索全部汉化包</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

