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
            <h2 className="text-2xl font-pixel mb-6">给我们发送消息</h2>
            {/* Microsoft Form Embed */}
            <div className="aspect-auto min-h-[600px] w-full">
              <iframe
                title="Contact Form"
                width="100%"
                height="600"
                src="https://forms.office.com/r/tCQ3gdjb1B?embed=true"
                frameBorder="0"
                className="minecraft-card w-full h-full"
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
                href="#"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495c-.0196.0452-.0392.0851-.0588.1197-.0166.0296-.0359.0444-.0621.0516-2.0134.8383-4.0157.8383-4.0157.8383s-2.0023 0-4.0157-.8383c-.0262-.0072-.0455-.022-.0621-.0516-.0196-.0346-.0392-.0745-.0588-.1197-.1636-.3847-.3972-.8742-.6083-1.2495a.077.077 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0796 1.5322 4.0997 2.4593 6.0291 3.0582a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0105c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277c-.598.3428-1.2195.6447-1.8732.8923a.076.076 0 00-.0407.1057c.3574.698.7689 1.3628 1.225 1.9942a.076.076 0 00.0842.0276c1.9369-.6004 3.9575-1.5275 6.0372-3.0582a.077.077 0 00.0303-.0561c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
                <span>Discord</span>
              </a>
              <a
                href="#"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Twitter</span>
              </a>
              <a
                href="#"
                className="minecraft-card p-3 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
                <span>Reddit</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

