import { Mail, MapPin, MessageCircle, HelpCircle, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faXTwitter,
  faBilibili,
  faGithub,
  faDiscord,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons"

export const metadata: Metadata = {
  title: "联系我们 | PixelLingual像素语匠",
  description:
    "与PixelLingual取得联系，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
  keywords:
    "Minecraft社区, 加入翻译社区, Minecraft志愿者, 游戏翻译, 中文本地化",
  openGraph: {
    url: "https://pling.top/contact",
    title: "联系我们 - PixelLingual像素语匠",
    description:
      "与PixelLingual取得联系，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
    images: "/logo-short.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLingual - Minecraft中文翻译工作室",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
  },
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ContactItem({
  icon: Icon,
  title,
  value,
  delay,
}: {
  icon: React.ElementType
  title: string
  value: string
  delay: number
}) {
  return (
    <div
      className="animate-slide-up flex items-start gap-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-pixel text-base text-foreground">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function FaqItem({
  question,
  answer,
  delay,
}: {
  question: string
  answer: string
  delay: number
}) {
  return (
    <div
      className="animate-slide-up rounded-xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-2 flex items-start gap-2">
        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <h3 className="font-pixel text-sm leading-snug text-foreground">
          {question}
        </h3>
      </div>
      <p className="pl-6 text-sm leading-relaxed text-muted-foreground">
        {answer}
      </p>
    </div>
  )
}

const socialLinks = [
  {
    href: "https://discord.gg/m2mQScdxed",
    icon: faDiscord,
    label: "Discord",
    color: "hover:border-indigo-500/40 hover:text-indigo-400",
  },
  {
    href: "https://github.com/Fanconma/pixellingual-site",
    icon: faGithub,
    label: "GitHub",
    color: "hover:border-foreground/40 hover:text-foreground",
  },
  {
    href: "https://x.com/plg_project",
    icon: faSquareXTwitter,
    label: "X",
    color: "hover:border-foreground/40 hover:text-foreground",
  },
  {
    href: "https://space.bilibili.com/647647625",
    icon: faBilibili,
    label: "哔哩哔哩",
    color: "hover:border-blue-400/40 hover:text-blue-400",
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[500px] h-[400px] w-[400px] rounded-full bg-blue-500/[0.03] blur-3xl" />

      {/* ========================================================== */}
      {/*  HERO                                                       */}
      {/* ========================================================== */}
      <section className="relative pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="container text-center">
          <div className="animate-slide-up">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mx-auto max-w-2xl font-pixel text-3xl leading-tight text-foreground md:text-5xl text-balance">
              联系我们
            </h1>
          </div>
          <p
            className="animate-slide-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "100ms" }}
          >
            对我们的翻译有疑问？想为我们的项目做贡献？还是只想打个招呼？我们很乐意听到您的声音！
          </p>
        </div>
      </section>

      {/* ========================================================== */}
      {/*  MAIN GRID                                                   */}
      {/* ========================================================== */}
      <section className="pb-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* ---- Left column: info ---- */}
            <div className="flex flex-col gap-10 lg:col-span-2">
              {/* Contact details */}
              <div className="rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
                <h2 className="mb-5 font-pixel text-lg text-foreground">
                  联系方式
                </h2>
                <div className="flex flex-col gap-5">
                  <ContactItem
                    icon={Mail}
                    title="邮箱"
                    value="Fanconma@gmail.com"
                    delay={150}
                  />
                  <ContactItem
                    icon={MapPin}
                    title="地址"
                    value="五湖四海，没有位置:)"
                    delay={200}
                  />
                  <div
                    className="animate-slide-up flex items-start gap-4"
                    style={{ animationDelay: "250ms" }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <FontAwesomeIcon
                        className="h-5 w-5"
                        icon={faDiscord}
                      />
                    </div>
                    <div>
                      <h3 className="font-pixel text-base text-foreground">
                        Discord
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        m2mQScdxed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div
                className="animate-slide-up rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm"
                style={{ animationDelay: "200ms" }}
              >
                <h2 className="mb-4 font-pixel text-lg text-foreground">
                  加入我们的社区
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  在我们的社区平台上与其他 Minecraft
                  爱好者和翻译者联系。
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card/40 px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/80 ${s.color}`}
                    >
                      <FontAwesomeIcon
                        icon={s.icon}
                        className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="font-pixel text-xs">{s.label}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Right column: form + faq ---- */}
            <div className="flex flex-col gap-8 lg:col-span-3">
              {/* Form embed */}
              <div
                className="animate-slide-up rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm md:p-8"
                style={{ animationDelay: "150ms" }}
              >
                <h2 className="mb-5 font-pixel text-xl text-foreground">
                  给我们发送消息
                </h2>
                <div className="w-full overflow-hidden rounded-lg">
                  <iframe
                    title="Contact Form"
                    width="100%"
                    height="600"
                    src="https://forms.office.com/r/tCQ3gdjb1B?embed=true"
                    frameBorder="0"
                    className="rounded-lg border border-border/30"
                    allowFullScreen
                  >
                    加载 Microsoft Form...
                  </iframe>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground/60">
                  Powered by Microsoft Forms. Your information will be handled
                  according to their privacy policy.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <div className="mb-5">
                  <div className="mb-3 h-1 w-10 rounded-full bg-primary" />
                  <h2 className="font-pixel text-xl text-foreground">
                    常见问题
                  </h2>
                </div>
                <div className="flex flex-col gap-4">
                  <FaqItem
                    question="我该怎么加入 PixelLingual？"
                    answer="我们欢迎更多玩家的贡献！你可以和我发个邮件、加个好友(1139083856)随便聊一聊:)"
                    delay={200}
                  />
                  <FaqItem
                    question="你提供的蓝奏云下载链接进去找不到下载按钮啊？"
                    answer="手机端进入蓝奏云分享页面后，你需要点开对应的.mcpack文件，下方就会显示下载按钮。无需注册蓝奏云账号。"
                    delay={280}
                  />
                  <FaqItem
                    question="我可以请求翻译特定的地图或Add-on吗？"
                    answer="是的！我们接受翻译请求，并根据社区兴趣确定其优先顺序。请使用联系表提交您的请求。"
                    delay={360}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
