import { Mail, MapPin, Phone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "联系我们 | PixelLingual - Minecraft中文翻译社区",
  description:
    "与PixelLingual取得联系，与志同道合的Minecraft爱好者一起翻译游戏内容，分享乐趣，共同成长。无论你是翻译爱好者、Minecraft玩家还是开发者，都能在这里找到归属。",
  keywords: "Minecraft社区, 加入翻译社区, Minecraft志愿者, 游戏翻译, 中文本地化",
}

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-pixel mb-6">联系我们</h1>
          <p className="text-muted-foreground mb-8">
          对我们的翻译有疑问？想为我们的项目做贡献？还是只想打个招呼？我们很乐意听到您的声音！
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">邮箱</h3>
                <p className="text-muted-foreground">Fanconma@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">地址</h3>
                <p className="text-muted-foreground">五湖四海，没有位置:)</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <i className="fab fa-discord h-4 w-5 text-primary"></i>
              </div>
              <div>
                <h3 className="font-pixel text-lg">Discord</h3>
                <p className="text-muted-foreground">m2mQScdxed</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-pixel mb-4">常见问题</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-pixel text-lg">我该怎么加入 PixelLingual？</h3>
                <p className="text-muted-foreground">
                我们欢迎更多玩家的贡献！你可以和我发个邮件、加个好友(1139083856)随便聊一聊:)
                </p>
              </div>

              <div>
                <h3 className="font-pixel text-lg">
                  你提供的蓝奏云下载链接进去找不到下载按钮啊？
                </h3>
                <p className="text-muted-foreground">
                  手机端进入蓝奏云分享页面后，你需要点开对应的.mcpack文件，下方就会显示下载按钮。无需注册蓝奏云账号。
                </p>
              </div>

              <div>
                <h3 className="font-pixel text-lg">我可以请求翻译特定的地图或Add-on吗？</h3>
                <p className="text-muted-foreground">
                是的！我们接受翻译请求，并根据社区兴趣确定其优先顺序。请使用联系表提交您的请求。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="minecraft-card p-8">
            <h2 className="text-2xl font-pixel mb-6">给我们发送消息</h2>
            {/* Microsoft Form Embed */}
            <div className="aspect-auto min-h-[600px] w-full">
              <iframe
                title="Contact Form"
                width="100%"
                height="600"
                src="https://forms.office.com/r/tCQ3gdjb1B?embed=true"
                frameBorder="0"
                className="minecraft-card"
                allowFullScreen
              >
                加载 Microsoft Form...
              </iframe>
              <p className="text-xs text-muted-foreground mt-4 text-center">
              Powered by Microsoft Forms. Your information will be handled according to our privacy policy.
            </p>
          </div>
          </div>
          <div className="mt-8 minecraft-card p-8">
            <h2 className="text-2xl font-pixel mb-4">加入我们的社区</h2>
            <p className="text-muted-foreground mb-6">
              在我们的社区平台上与其他 Minecraft 爱好者和翻译者联系。
            </p>

            <div className="grid grid-cols-2 gap-4">
            <a
                href="https://discord.gg/m2mQScdxed"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <i className="fab fa-discord h-4 w-5"></i>
                <span>Discord</span>
              </a>
              <a
                href="https://github.com/Fanconma/pixellingual-site"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <i className="fab fa-github h-4 w-5"></i>
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/plg_project"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <i className="fab fa-x-twitter"></i>
                <span>X</span>
              </a>
              <a
                href="https://space.bilibili.com/647647625"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <i className="fab fa-bilibili h-4 w-5"></i>
                <span>哔哩哔哩</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

