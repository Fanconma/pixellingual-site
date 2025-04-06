import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { Users, MessageSquare, Code, ImportIcon as Translate, Gamepad2, Heart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "加入我们 | PixelLingual - Minecraft中文翻译社区",
  description:
    "加入PixelLingual社区，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
  keywords: "Minecraft社区, 加入翻译社区, Minecraft志愿者, 游戏翻译, 中文本地化",
}

export default function JoinPage() {
  return (
    <div className="container py-12 md:py-20">
      {/* 英雄区域 */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl font-pixel mb-4">加入我们的社区</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          PixelLingual是一个充满热情的Minecraft翻译社区，我们欢迎所有对游戏翻译感兴趣的小伙伴加入！
          无论你是翻译爱好者、Minecraft玩家还是开发者，这里都有你的一席之地。
        </p>
      </div>

      {/* 为什么加入我们 */}
      <div className="mb-20 animate-fade-in animate-delay-100">
        <h2 className="text-3xl font-pixel mb-8 text-center">为什么加入我们？</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="minecraft-card p-6 space-y-4 transform transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-pixel text-xl">友好的社区</h3>
            <p className="text-muted-foreground">
              加入一个充满热情的社区，认识志同道合的朋友，一起分享Minecraft的乐趣。
            </p>
          </div>

          <div className="minecraft-card p-6 space-y-4 transform transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Translate className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-pixel text-xl">提升翻译技能</h3>
            <p className="text-muted-foreground">
              通过实践提升你的翻译技能，在翻译的过程中能有效学习英语语法、巩固词汇。
            </p>
          </div>

          <div className="minecraft-card p-6 space-y-4 transform transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Gamepad2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-pixel text-xl">抢先体验</h3>
            <p className="text-muted-foreground">
              参与翻译项目的社区成员可以通过加入PLG服务器访问待翻译市场地图和我们的翻译成果。
            </p>
          </div>
        </div>
      </div>

      {/* 如何参与 */}
      <div className="mb-20 animate-fade-in animate-delay-200">
        <h2 className="text-3xl font-pixel mb-8 text-center">如何参与</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="minecraft-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <Translate className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-pixel text-xl">翻译贡献者</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                帮助我们将Minecraft的内容从英文翻译成中文。无论你能贡献多少时间，每一点帮助都很宝贵！
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>翻译游戏文本、物品描述和对话</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>校对和改进现有翻译</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>参与翻译术语表的维护</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground">需要：至少在中英文间有一种作为母语，热爱Minecraft，有责任心</div>
            </div>
          </div>

          <div className="minecraft-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                  <Code className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-pixel text-xl">技术贡献者</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                帮助我们改进翻译工具、网站和资源包。用你的技术技能让翻译过程更加顺畅！
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>开发和维护翻译工具</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>改进网站功能和用户体验</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span>创建和维护PLG服务器</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground">需要：了解Javascript、React和NextJS框架基础；对Minecraft基岩版资源包有较深入了解；会开设BDS；有ScriptAPI(MCBE)的基础。满足四者之一即可。</div>
            </div>
          </div>

          <div className="minecraft-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-pixel text-xl">社区贡献者</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                帮助我们建设和维护一个活跃、友好的社区。分享知识，帮助新成员，组织活动！
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>在Discord和论坛上帮助其他成员</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>组织社区活动和翻译马拉松</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>创建教程和指南</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground">需要：良好的沟通能力，热情友好，乐于助人</div>
            </div>
          </div>

          <div className="minecraft-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-pixel text-xl">支持者</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                即使你没有时间参与翻译，你也可以通过分享我们的项目、提供反馈或捐赠来支持我们！
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>分享我们的翻译包和网站</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>提供反馈和建议</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>通过捐赠支持我们的工作</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground">需要：一颗充满热情的心:) 谢谢你们！</div>
            </div>
          </div>
        </div>
      </div>

      {/* 社区福利 */}
      <div className="mb-20 animate-fade-in animate-delay-300">
        <h2 className="text-3xl font-pixel mb-8 text-center">社区福利</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="minecraft-card p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-pixel text-lg mb-2">专属徽章</h3>
            <p className="text-muted-foreground">活跃的社区成员可以获得专属的Discord徽章和网站相关标识。</p>
          </div>

          <div className="minecraft-card p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Gamepad2 className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-pixel text-lg mb-2">抢先体验</h3>
            <p className="text-muted-foreground">参与翻译的成员可以抢先体验最新的翻译内容和市场地图。</p>
          </div>

          <div className="minecraft-card p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-pixel text-lg mb-2">社区活动</h3>
            <p className="text-muted-foreground">参加我们的Minecraft多人游戏活动、翻译马拉松和线上聚会。</p>
          </div>
        </div>
      </div>

      {/* 加入我们 */}
      <div className="text-center animate-fade-in animate-delay-400">
        <h2 className="text-3xl font-pixel mb-6">准备好加入了吗？</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          加入我们的Discord服务器，开始你的PixelLingual之旅！我们的社区成员会帮助你熟悉环境，找到适合你的贡献方式。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="minecraft-btn">
            <a href="https://discord.gg/pixellingual" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-.0196.0452-.0392.0851-.0588.1197-.0166.0296-.0359.0444-.0621.0516-2.0134.8383-4.0157.8383-4.0157.8383s-2.0023 0-4.0157-.8383c-.0262-.0072-.0455-.022-.0621-.0516-.0196-.0346-.0392-.0745-.0588-.1197-.1636-.3847-.3972-.8742-.6083-1.2495a.077.077 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0796 1.5322 4.0997 2.4593 6.0291 3.0582a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0105c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277c-.598.3428-1.2195.6447-1.8732.8923a.076.076 0 00-.0407.1057c.3574.698.7689 1.3628 1.225 1.9942a.076.076 0 00.0842.0276c1.9369-.6004 3.9575-1.5275 6.0372-3.0582a.077.077 0 00.0303-.0561c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
              </svg>
              加入Discord
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">联系我们</Link>
          </Button>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="mt-20 animate-fade-in animate-delay-500">
        <h2 className="text-2xl font-pixel mb-6 text-center">常见问题</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="minecraft-card p-6">
            <h3 className="font-pixel text-lg mb-2">我需要有翻译经验吗？</h3>
            <p className="text-muted-foreground">
              不需要！我们欢迎所有热爱Minecraft的人加入。只需有初中英语水平和对翻译的热情即可。
            </p>
          </div>

          <div className="minecraft-card p-6">
            <h3 className="font-pixel text-lg mb-2">我每周需要贡献多少时间？</h3>
            <p className="text-muted-foreground">
              完全取决于你！我们没有最低时间要求，你可以根据自己的时间和兴趣参与。
            </p>
          </div>

          <div className="minecraft-card p-6">
            <h3 className="font-pixel text-lg mb-2">我的中文不是很好，可以参与吗？</h3>
            <p className="text-muted-foreground">
              当然可以！除了翻译，我们还有许多其他方式可以贡献，比如技术支持、社区管理或测试翻译包。
            </p>
          </div>

          <div className="minecraft-card p-6">
            <h3 className="font-pixel text-lg mb-2">我会得到报酬吗？</h3>
            <p className="text-muted-foreground">
              PixelLingual是一个志愿者社区，我们的工作基于对Minecraft和翻译的热爱。虽然没有金钱报酬，但你会获得宝贵的经验、技能和社区认可。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

