// app/donate/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { fetchDonors } from "@/lib/afdian"
import { Donor } from "@/types/donor"
import { Metadata } from "next"
import { SPONSOR_INFO } from "@/data/donors"

export const metadata: Metadata = {
  title: "支持我们 | PixelLingual - Minecraft中文翻译社区",
  description: "通过捐赠支持PixelLingual继续为社区提供高质量的Minecraft中文翻译。您的支持将帮助我们扩展翻译内容并提高质量。",
  keywords: "Minecraft捐赠, 支持Minecraft翻译, PixelLingual支持者, Minecraft中文翻译",
}

export default async function DonatePage() {
  let donors: Donor[] = []
try {
  donors = await fetchDonors()
} catch (e) {
  console.error("获取爱发电数据失败:", e)
}
donors.sort((a, b) => b.amount - a.amount);
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-pixel mb-4">支持PixelLingual</h1>
          <p className="text-lg text-muted-foreground">帮助我们继续为社区提供高质量的Minecraft翻译</p>
        </div>

        {/* 赞助选项 */}
        <div className="minecraft-card p-8 mb-16">
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`h-16 w-16 rounded-full ${SPONSOR_INFO.bg} flex items-center justify-center mb-4`}>
              <Heart className={`h-8 w-8 ${SPONSOR_INFO.color}`} />
            </div>
            <h3 className="font-pixel text-xl mb-2">{SPONSOR_INFO.label}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              成为PixelLingual的社区支持者，帮助我们为更多的Minecraft内容提供高质量的中文翻译。
              您的每一份贡献都将直接用于支持我们的翻译团队和服务器成本。
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              {SPONSOR_INFO.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-center">
                  <span className="text-primary mr-2">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 自定义捐赠 */}
          <div className="minecraft-card p-8 mb-16">
            <h2 className="text-2xl font-pixel mb-4 text-center">自定义捐赠金额</h2>
            <p className="text-center text-muted-foreground mb-6">想要捐赠其他金额？在下方选择您的捐赠金额。</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {[1, 5, 10, 25, 100].map((amount) => (
                <Link
                  key={amount}
                  href={`https://afdian.tv/order/create?user_id=fa5ea3824a1b11ec9f7052540025c377&custom_price=${amount}`}
                >
                  <Button variant="outline" className="minecraft-btn">
                    ￥{amount}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button className={`minecraft-btn ${SPONSOR_INFO.buttonColor} px-8 py-2`}>成为支持者</Button>
          </div>
        </div>
{/* 我们的支持者 */}
<div>
  <h2 className="text-3xl font-pixel mb-8 text-center">我们的支持者</h2>

  {donors.length === 0 ? (
    <div className="text-center text-muted-foreground mb-10">
      暂无支持者数据，或者加载失败。
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {donors.slice(0, 6).map((donor) => (
          <div key={donor.id} className="minecraft-card p-4 flex gap-4 border-primary/50">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src={donor.avatar} alt={donor.name} fill className="object-cover" />
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-pixel text-lg">{donor.name}</h4>
                <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  ￥{donor.amount}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{donor.message}</p>
              <div className="text-xs text-muted-foreground">
                <span>{new Date(donor.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 更多支持者 */}
      {donors.length > 6 && (
        <div className="minecraft-card p-6 mb-10">
          <h3 className="font-pixel text-lg mb-4 text-center">更多支持者</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {donors.slice(6).map((donor) => (
              <div key={donor.id} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={donor.avatar} alt={donor.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-pixel text-sm truncate">{donor.name}</p>
                  <p className="text-xs text-primary">￥{donor.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )}
</div>
          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-pixel mb-6 text-center">常见问题</h2>

            <div className="space-y-6">
              <div className="minecraft-card p-6">
                <h3 className="font-pixel text-lg mb-2">赞助如何使用？</h3>
                <p className="text-muted-foreground">
                  所有赞助直接用于支持我们的翻译团队、服务器成本以及开发新的翻译工具，以提高我们翻译的质量和速度。
                </p>
              </div>

              <div className="minecraft-card p-6">
                <h3 className="font-pixel text-lg mb-2">赞助可以抵税吗？</h3>
                <p className="text-muted-foreground">
                  PixelLingual不是注册的非营利组织，因此赞助不能抵税。
                </p>
              </div>

              <div className="minecraft-card p-6">
                <h3 className="font-pixel text-lg mb-2">我不在中国内地，可以赞助吗？</h3>
                <p className="text-muted-foreground">
                  当然可以！感谢您的善心{"<"}3。爱发电支持的支付方式有：支付宝、微信支付、Paypal和Stripe。目前暂时没有使用 Patreon 的计划。
                </p>
              </div>

              <div className="minecraft-card p-6">
                <h3 className="font-pixel text-lg mb-2">如何让我的名字出现在支持者列表中？</h3>
                <p className="text-muted-foreground">
                  任何金额的赞助都可以出现在支持者列表中，我们通过 API 自动拉取您的信息。您可以在赞助过程中添加一个可选的留言。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
