"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCcw } from "lucide-react"

export default function InternalErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Minecraft-style Redstone Error */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
            {/* Redstone dust pattern using grid */}
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8)
              const col = i % 8

              // Define the redstone pattern (forming a "500")
              const redstonePattern = [
                [0, 1, 1, 0, 1, 1, 0, 0],
                [1, 0, 0, 0, 1, 0, 1, 0],
                [1, 0, 0, 0, 1, 0, 1, 0],
                [0, 1, 1, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
              ]

              return <div key={i} className={`${redstonePattern[row][col] ? "bg-red-600" : "bg-transparent"}`} />
            })}
          </div>
        </div>

        <div className="minecraft-card p-8 animate-glitch">
          <h1 className="text-5xl font-pixel mb-4 text-red-500">500</h1>
          <h2 className="text-3xl font-pixel mb-6">服务器内部错误</h2>
          <p className="text-lg mb-8">哎呀！看起来我们的红石电路出现了故障。我们的工程师正在努力修复这个问题。</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.reload()} className="minecraft-btn">
              <RefreshCcw className="mr-2 h-4 w-4" />
              重试
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">错误代码: REDSTONE_FAILURE_500</div>
      </div>
    </div>
  )
}

