import type React from "react"
import type { Metadata } from "next"
import { Inter, Press_Start_2P } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})
export const metadata: Metadata = {
  title: "PixelLingual - Minecraft中文翻译工作室",
  description: "PixelLingual专注于将Minecraft基岩版内容从英文翻译成中文。免费下载高质量的翻译文件，提升您的游戏体验。",
  keywords: "Minecraft翻译, 中文翻译, 基岩版翻译, 免费Minecraft资源, 游戏本地化",
  authors: [{ name: "PixelLingual Team" }],
  creator: "PixelLingual",
  publisher: "PixelLingual",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://pixellingual.com",
    title: "PixelLingual - Minecraft中文翻译工作室",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
    siteName: "PixelLingual",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLingual - Minecraft中文翻译工作室",
    description: "免费下载高质量的Minecraft基岩版中文翻译，提升您的游戏体验。",
    creator: "@pixellingual",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://pixellingual.com"),
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
                <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* 添加结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PixelLingual",
              url: "https://pixellingual.com",
              logo: "https://pixellingual.com/logo.png",
              description: "PixelLingual专注于将Minecraft基岩版内容从英文翻译成中文。",
              sameAs: [
                "https://twitter.com/pixellingual",
                "https://github.com/pixellingual",
                "https://discord.gg/pixellingual",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${pixelFont.variable} font-sans`}>
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

