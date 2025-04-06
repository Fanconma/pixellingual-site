import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Minecraft-style creeper face */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
            {/* Creeper face pattern using grid */}
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8)
              const col = i % 8

              // Define the creeper face pattern
              const creeperPattern = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
              ]

              return <div key={i} className={`${creeperPattern[row][col] ? "bg-black" : "bg-green-600"}`} />
            })}
          </div>
        </div>

        <div className="minecraft-card p-8 animate-pulse-slow">
          <h1 className="text-5xl font-pixel mb-4 text-red-500">404</h1>
          <h2 className="text-3xl font-pixel mb-6">Page Not Found</h2>
          <p className="text-lg mb-8">
          哎呀！好像有苦力怕炸掉了这个页面。您正在寻找的方块已被破坏或根本不存在。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="minecraft-btn">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/market">
                <Search className="mr-2 h-4 w-4" />
                浏览翻译包
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">Error Code: CREEPER_EXPLOSION_404</div>
      </div>
    </div>
  )
}

