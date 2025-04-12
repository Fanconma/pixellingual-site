import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo-short.png" alt="PixelLingual Logo" width={40} height={40} className="pixelated" />
              <span className="font-pixel text-lg">PixelLingual</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Where Words Shape Worlds. 
            </p>
          </div>

          <div>
            <h3 className="font-pixel text-sm mb-4">导航栏</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/market" className="text-muted-foreground hover:text-primary transition-colors">
                  市场
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-muted-foreground hover:text-primary transition-colors">
                  加入我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-sm mb-4">资源信息</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                  教程
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  捐赠
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-sm mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/Fanconma/pixellingual-site" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-github h-5 w-5"></i>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/plg_project" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-x-twitter h-5 w-5"></i>
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://discord.gg/m2mQScdxed" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-discord h-5 w-5"></i>
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="https://space.bilibili.com/647647625" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-bilibili h-5 w-5"></i>
                <span className="sr-only">Bilibili</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PixelLingual. All rights reserved.</p>
          <p>"Minecraft" is a trademark of Mojang AB. PixelLingual is not affiliated in any way with Microsoft or Mojang AB.</p>
        </div>
      </div>
    </footer>
  )
}

