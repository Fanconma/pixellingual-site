import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Globe, Download, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="About PixelLingual"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel tracking-tight">
              About <span className="text-primary">PixelLingual</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              我们希望通过我们的翻译包能让更多玩家领略到 Minecraft 地图的魅力。我们致力于为 Minecraft 基岩版市场地图提供高质量的中文翻译，让每个玩家都能享受无障碍的游戏体验。
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-pixel mb-6">背后的故事</h2>
              <div className="space-y-4">
                <p>
                  最初（2020年左右），我(Fanconma)偶然下想到一个“用日语打开Simburbia地图”的想法(我也忘了为什么了hhh)，结果进入地图后发现地图居然成为了日语。这使我产生了兴趣：这是否意味着我们可以通过类似的方法得到一个自己的中文翻译呢？经过一系列测试，如把中文内容放到ja_JP.lang，把语言文件单独成一个资源包，最终成功得到了我的第一个中文翻译包。
                </p>
                <p>
                  自从那时开始，我开始翻译地图并和朋友一起游玩。朋友能够通过看“我敲的文字”来理解地图意思，这让我有一种很难说的成就感。再到后来，2022年4月左右，我和一个朋友(炎黄)尝试一起翻译了第一个地图，这让我开始对此产生浓厚的兴趣。
                </p>
                <p>
                  现在，我已经翻译了很多张地图。虽然高中学业紧张，很久没有发过翻译包了，但我还会尽量坚持下去，这也就是创建这个新网站的原因:)
                </p>
                <p>由于篇幅限制没办法说太详细的内容，如果你真的感兴趣，可以点<a href="https://docs.qq.com/aio/DS2tVeUd3dkFaUEJ2" className="text-green-700">这里</a>查看详细的故事:)谢谢你</p>
              </div>
            </div>
            <div className="minecraft-card overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Our Team"
                alt="PixelLingual Team"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-pixel text-xl">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe everyone should be able to enjoy Minecraft regardless of the language they speak.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-pixel text-xl">Quality</h3>
              <p className="text-muted-foreground">
                We're committed to providing accurate, natural-sounding translations that preserve the original
                experience.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-pixel text-xl">Community</h3>
              <p className="text-muted-foreground">
                We're built by and for the Minecraft community, with open collaboration at our core.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-pixel text-xl">Free Access</h3>
              <p className="text-muted-foreground">
                All our translations are and will always be free for everyone to download and enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">翻译包の制作过程</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  1
                </div>
                <h3 className="font-pixel text-xl">选择地图</h3>
                <p className="text-muted-foreground">
                  首先从 Minecraft 基岩版市场挑一张看起来比较好玩的地图:D
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl text-muted-foreground">
                →
              </div>
            </div>

            <div className="relative">
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  2
                </div>
                <h3 className="font-pixel text-xl">翻译</h3>
                <p className="text-muted-foreground">
                  翻译作者将地图中的英文文本导出并且结合互联网信息进行翻译。翻译作者会尽量保留原作者的意图和风格。
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl text-muted-foreground">
                →
              </div>
            </div>

            <div>
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  3
                </div>
                <h3 className="font-pixel text-xl">翻译后的校对</h3>
                <p className="text-muted-foreground">
                  大多数汉化包经过了翻译作者的校对。但由于团队人员不太够，还是很可能出现一些翻译错误的，尽情见谅:(
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">认识我们的团队</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Fanconma",
                role: "创建人",
                image: "/placeholder.svg?height=400&width=400&text=Li Wei",
              },
              {
                name: "没人拉！你来吗？",
                role: "PixelLingual刚刚创建，所以暂时没什么人qwq",
                image: "/placeholder.svg?height=400&width=400&text=Zhang Min",
              },
              
            ].map((member, i) => (
              <div key={i} className="minecraft-card overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-pixel text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-pixel">加入我们的社区</h2>
            <p className="text-muted-foreground">
            无论您是寻求翻译的玩家还是想要做出贡献的翻译者，我们都欢迎您加入我们不断壮大的社区。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="minecraft-btn">
                <Link href="/market">
                  浏览翻译包
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">联系我们</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

