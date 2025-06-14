import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TroubleshootingPage() {
  return (
    <div className="container py-12">
      <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回市场
      </Link>

      <h1 className="text-3xl font-pixel mb-6">故障排除指南</h1>

      <div className="minecraft-card p-6 mb-8">
        <h2 className="text-xl font-pixel mb-4">常见安装错误</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">翻译资源包并没有在全局资源中出现</h3>
            <p className="mb-2">如果你的翻译包在导入后仍然不存在:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>请尝试打开设置界面的“全局资源包”菜单查找是否存在</li>
              <li>检查导入后是否弹出了“导入成功”的吐司信息，部分资源包导入可能略慢</li>
              <li>尝试完全重启 Minecraft</li>
              <li>确保你的Minecraft版本是否较新</li>
              <li>若显示导入失败，这有一定可能是翻译作者UUID设置错误或翻译资源包文件内出现了中文内容，你可以尝试自行解决或联系翻译作者</li>
            </ol>
          </div>

          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">文本仍然以英文显示</h3>
            <p className="mb-2">如果安装翻译后某些文本仍然显示为英文:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>你可能激活了错误的翻译资源包或激活了多个翻译资源包</li>
              <li>确保翻译资源包位于激活资源包列表的顶部</li>
              <li>由于地图原因，部分翻译包可能无法涵盖全部地图文本内容</li>
              <li>前往语言设置并使用“中文(中国)”，而不是其他语言</li>
            </ol>
          </div>

          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">文本损坏或破损</h3>
            <p className="mb-2">如果您看到残缺的字符或损坏的文本：</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>确保您的设备支持中文显示</li>
              <li>尝试再次下载翻译包，因为文件可能已损坏</li>
              <li>检查你的 Minecraft 安装是否是最新的</li>
              <li>尝试清除 Minecraft 的缓存并重新启动游戏</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="minecraft-card p-6 mb-8">
        <h2 className="text-xl font-pixel mb-4">技术要求</h2>

        <div className="space-y-4">
          <p>要使用 PixelLingual 翻译包，您的设备必须满足以下要求：</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Minecraft Bedrock Edition (推荐使用最新正式版，非网易代理版本)</li>
            <li>支持汉字显示的设备</li>
            <li>至少 100MB 的可用存储空间</li>
            <li>用于下载翻译包的互联网连接</li>
          </ul>
        </div>
      </div>

      <div className="minecraft-card p-6">
        <h2 className="text-xl font-pixel mb-4">联系支持</h2>

        <p className="mb-4">
          如果您尝试上述故障排除步骤后仍然遇到问题，请联系我们的支持团队：
        </p>

        <div className="space-y-2">
          <p>Email: support@pixellingual.com</p>
          <p>
            Discord: Join our{" "}
            <a href="#" className="text-primary hover:underline">
              Discord server
            </a>{" "}
            for community support
          </p>
        </div>

        <div className="mt-6">
          <Button asChild className="minecraft-btn">
            <Link href="/contact">联系我们</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

