import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import {
  Users,
  MessageSquare,
  Code,
  ImportIcon as Translate,
  Gamepad2,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

export const metadata: Metadata = {
  title: "加入我们 | PixelLingual像素语匠",
  description:
    "加入PixelLingual社区，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
  keywords: "Minecraft社区, 加入翻译社区, Minecraft志愿者, 游戏翻译, 中文本地化",
  openGraph: {
    url: "https://pling.top/join-us",
    title: "加入我们 - PixelLingual像素语匠",
    description:
      "加入PixelLingual社区，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
    images: "/logo-short.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLingual - Minecraft中文翻译工作室",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
  },
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-primary" />
      <h2 className="font-pixel text-2xl text-foreground md:text-3xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function ReasonCard({
  icon: Icon,
  color,
  title,
  description,
  delay,
}: {
  icon: React.ElementType
  color: string
  title: string
  description: string
  delay: number
}) {
  const colorMap: Record<string, string> = {
    primary:
      "bg-primary/10 text-primary group-hover:bg-primary/20 border-primary/20",
    blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 border-blue-500/20",
    amber:
      "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 border-amber-500/20",
  }
  return (
    <div
      className="group animate-slide-up rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(93,156,66,0.08)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 ${colorMap[color]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-pixel text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Role cards                                                         */
/* ------------------------------------------------------------------ */

interface RoleCardProps {
  icon: React.ElementType
  color: string
  title: string
  description: string
  bullets: string[]
  requirement: string
  delay: number
}

function RoleCard({
  icon: Icon,
  color,
  title,
  description,
  bullets,
  requirement,
  delay,
}: RoleCardProps) {
  const dotColor: Record<string, string> = {
    primary: "text-primary",
    blue: "text-blue-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
  }
  const iconBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  }

  return (
    <div
      className="group animate-slide-up flex flex-col rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(93,156,66,0.08)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-1 flex-col p-6">
        {/* header */}
        <div className="mb-4 flex items-center gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${iconBg[color]}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-pixel text-xl text-foreground">{title}</h3>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* bullets */}
        <ul className="mb-6 flex-1 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 shrink-0 ${dotColor[color]}`}
              />
              <span className="text-foreground/80">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* footer */}
      <div className="border-t border-border/30 px-6 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground/70">
          {requirement}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function JoinPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[600px] h-[400px] w-[400px] rounded-full bg-blue-500/[0.03] blur-3xl" />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="container text-center">
          <div className="animate-slide-up">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mx-auto max-w-3xl font-pixel text-3xl leading-tight text-foreground md:text-5xl text-balance">
              加入我们的社区
            </h1>
          </div>
          <p
            className="animate-slide-up mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "100ms" }}
          >
            PixelLingual是一个充满热情的Minecraft翻译社区，我们欢迎所有对游戏翻译感兴趣的小伙伴加入！无论你是翻译爱好者、Minecraft玩家还是开发者，这里都有你的一席之地。
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY JOIN                                                     */}
      {/* ============================================================ */}
      <section className="pb-20">
        <div className="container">
          <SectionHeader title="为什么加入我们？" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ReasonCard
              icon={Users}
              color="primary"
              title="友好的社区"
              description="加入一个充满热情的社区，认识志同道合的朋友，一起分享Minecraft的乐趣。"
              delay={100}
            />
            <ReasonCard
              icon={Translate}
              color="blue"
              title="提升翻译技能"
              description="通过实践提升你的翻译技能，在翻译的过程中能有效学习英语语法、巩固词汇。"
              delay={200}
            />
            <ReasonCard
              icon={Gamepad2}
              color="amber"
              title="抢先体验"
              description="参与翻译项目的社区成员可以通过加入PLG服务器访问待翻译市场地图和我们的翻译成果。"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW TO PARTICIPATE                                           */}
      {/* ============================================================ */}
      <section className="pb-20">
        <div className="container">
          <SectionHeader title="如何参与" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <RoleCard
              icon={Translate}
              color="primary"
              title="翻译贡献者"
              description="帮助我们将Minecraft的内容从英文翻译成中文。无论你能贡献多少时间，每一点帮助都很宝贵！"
              bullets={[
                "翻译游戏文本、物品描述和对话",
                "校对和改进现有翻译",
                "参与翻译术语表的维护",
              ]}
              requirement="需要：至少在中英文间有一种作为母语，热爱Minecraft，有责任心"
              delay={100}
            />
            <RoleCard
              icon={Code}
              color="blue"
              title="技术贡献者"
              description="帮助我们改进翻译工具、网站和资源包。用你的技术技能让翻译过程更加顺畅！"
              bullets={[
                "开发和维护翻译工具",
                "改进网站功能和用户体验",
                "创建和维护PLG服务器",
              ]}
              requirement="需要：了解Javascript、React和NextJS框架基础；对Minecraft基岩版资源包有较深入了解；会开设BDS；有ScriptAPI(MCBE)的基础。满足四者之一即可。"
              delay={200}
            />
            <RoleCard
              icon={MessageSquare}
              color="amber"
              title="社区贡献者"
              description="帮助我们建设和维护一个活跃、友好的社区。分享知识，帮助新成员，组织活动！"
              bullets={[
                "在Discord和论坛上帮助其他成员",
                "组织社区活动和翻译马拉松",
                "创建教程和指南",
              ]}
              requirement="需要：良好的沟通能力，热情友好，乐于助人"
              delay={300}
            />
            <RoleCard
              icon={Heart}
              color="rose"
              title="支持者"
              description="即使你没有时间参与翻译，你也可以通过分享我们的项目、提供反馈或捐赠来支持我们！"
              bullets={[
                "分享我们的翻译包和网站",
                "提供反馈和建议",
                "通过捐赠支持我们的翻译~",
              ]}
              requirement="需要：一颗充满热情的心:) 谢谢你们！"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PERKS                                                        */}
      {/* ============================================================ */}
      <section className="pb-20">
        <div className="container">
          <SectionHeader title="社区福利" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                color: "primary" as const,
                title: "专属徽章",
                desc: "活跃的社区成员可以获得专属的Discord徽章和网站相关标识。",
              },
              {
                icon: Gamepad2,
                color: "blue" as const,
                title: "抢先体验",
                desc: "参与翻译的成员可以抢先体验最新的翻译内容和市场地图。",
              },
              {
                icon: Users,
                color: "amber" as const,
                title: "社区活动",
                desc: "参加我们的Minecraft多人游戏活动、翻译马拉松和线上聚会。",
              },
            ].map((perk, i) => {
              const bgMap: Record<string, string> = {
                primary: "bg-primary/10 text-primary border-primary/20",
                blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              }
              return (
                <div
                  key={perk.title}
                  className="animate-slide-up rounded-xl border border-border/40 bg-card/60 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(93,156,66,0.08)]"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 ${bgMap[perk.color]}`}
                  >
                    <perk.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-pixel text-lg text-foreground">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {perk.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="pb-20">
        <div className="container">
          <div className="animate-slide-up mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/[0.04] p-8 text-center backdrop-blur-sm md:p-12">
            <h2 className="font-pixel text-2xl text-foreground md:text-3xl text-balance">
              准备好加入了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
              加入我们的Discord服务器，开始你的PixelLingual之旅！我们的社区成员会帮助你熟悉环境，找到适合你的贡献方式。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary px-7 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]"
              >
                <a
                  href="https://discord.gg/m2mQScdxed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                  加入Discord
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-border/50 font-pixel transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
              >
                <Link href="/contact">
                  联系我们
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="pb-24">
        <div className="container">
          <SectionHeader title="常见问题" />
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                q: "我需要有翻译经验吗？",
                a: "不需要！我们欢迎所有热爱Minecraft的人加入。只需有基础的英语水平和对翻译的热情即可。",
              },
              {
                q: "我每周需要贡献多少时间？",
                a: "完全取决于你！我们没有最低时间要求，你可以根据自己的时间和兴趣参与。",
              },
              {
                q: "我的中文不是很好，可以参与吗？",
                a: "当然可以！除了翻译，我们还有许多其他方式可以贡献，比如技术支持、社区管理或测试翻译包。",
              },
              {
                q: "我会得到报酬吗？",
                a: "PixelLingual是一个志愿者社区，我们的工作基于对Minecraft和翻译的热爱。虽然没有金钱报酬，但你会获得宝贵的经验、技能和社区认可。",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="animate-slide-up rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <div className="mb-2 flex items-start gap-2">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <h3 className="font-pixel text-base text-foreground">
                    {faq.q}
                  </h3>
                </div>
                <p className="pl-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
