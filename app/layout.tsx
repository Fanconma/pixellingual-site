import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Preload from "./preload"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pixelFont = localFont({
  src: "./fonts/unifont-16.0.02.otf", // 相对于该文件的位置
  weight: "500",           // 根据实际字体权重设置
  variable: "--font-pixel",
})
export const metadata: Metadata = {
  title: "PixelLingual - Minecraft中文翻译工作室",
  description: "PixelLingual专注于将Minecraft基岩版内容从英文翻译成中文。免费下载高质量的翻译文件，提升您的游戏体验。",
  keywords: "Minecraft翻译, 中文翻译, 基岩版翻译, 免费Minecraft资源, 游戏本地化",
  authors: [{ name: "Fanconma" }],
  creator: "PixelLingual",
  publisher: "PixelLingual",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://pling.top",
    title: "PixelLingual - Minecraft中文翻译工作室",
    images: "/logo-short.png",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
    siteName: "PixelLingual",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLingual - Minecraft中文翻译工作室",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
    images: "/logo-short.png",
    creator: "@pixellingual",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://pling.top"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* 添加FontAwesome */}
        <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet" />
        {/* 添加结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PixelLingual",
              url: "https://pling.top",
              logo: "https://pling.top/logo.png",
              description: "PixelLingual专注于将Minecraft基岩版内容从英文翻译成中文。",
              sameAs: [
                "https://x.com/pixellingual",
                "https://github.com/pixellingual",
                "https://discord.gg/pixellingual",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${pixelFont.variable} font-sans`}>
      <Preload />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

