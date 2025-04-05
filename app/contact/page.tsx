import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

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
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">Discord</h3>
                <p className="text-muted-foreground">加入我们的Discord服务器: PixelLingual</p>
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
            <h2 className="text-2xl font-pixel mb-6">给我们发送消息(暂时不可用)</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-pixel text-sm">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-pixel text-sm">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-pixel text-sm">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-pixel text-sm">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={6} />
              </div>

              <Button type="submit" className="minecraft-btn w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="mt-8 minecraft-card p-8">
            <h2 className="text-2xl font-pixel mb-4">加入我们的社区</h2>
            <p className="text-muted-foreground mb-6">
              在我们的社区平台上与其他 Minecraft 爱好者和翻译者联系。
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Discord
              </Button>
              <Button variant="outline" className="w-full">
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                Bilibili
              </Button>
              <Button variant="outline" className="w-full">
                X (AKA Twitter)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

