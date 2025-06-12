"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCcw } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Minecraft-style TNT block */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-red-600 border-4 border-gray-800">
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-black font-pixel text-4xl">TNT</div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white/20"></div>
          </div>
        </div>

        <div className="minecraft-card p-8">
          <h1 className="text-3xl font-pixel mb-6 text-red-500">出问题了！</h1>
          <p className="text-lg mb-8">
            看来我们的服务器上的 TNT 爆炸了！这并不是你的问题。请尝试联系支持团队或稍后再试。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="minecraft-btn">
              <RefreshCcw className="mr-2 h-4 w-4" />
              再试一次
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">Error Code: TNT_EXPLOSION_{error.digest}</div>
      </div>
    </div>
  )
}

