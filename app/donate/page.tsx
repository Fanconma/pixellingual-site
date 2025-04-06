import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { TIER_INFO, DIAMOND_DONORS, GOLD_DONORS, IRON_DONORS } from "@/data/donors"

// 为SEO优化添加元数据
export const metadata: Metadata = {
  title: "支持我们 | PixelLingual - Minecraft翻译工作室",
  description:
    "通过捐赠支持PixelLingual继续为社区提供高质量的Minecraft中文翻译。您的支持将帮助我们扩展翻译内容并提高质量。",
  keywords: "Minecraft捐赠, 支持Minecraft翻译, PixelLingual支持者, Minecraft中文翻译",
}

export default function DonatePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-pixel mb-4">支持PixelLingual</h1>
          <p className="text-lg text-muted-foreground">帮助我们继续为社区提供高质量的Minecraft翻译</p>
        </div>

        {/* 捐赠等级 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {Object.entries(TIER_INFO).map(([key, tier]) => (
            <div
              key={key}
              className={`minecraft-card p-6 flex flex-col items-center text-center ${tier.popular ? "border-yellow-400 relative" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-pixel px-4 py-1 text-sm">
                  热门选择
                </div>
              )}
              <div className={`h-16 w-16 rounded-full ${tier.bg} flex items-center justify-center mb-4`}>
                <i className={`fas fa-${tier.icon} text-2xl ${tier.color}`}></i>
              </div>
              <h3 className="font-pixel text-xl mb-2">{tier.label}</h3>
              <p className="text-2xl font-bold mb-4">${tier.amount}</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                {tier.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <Button className={`minecraft-btn w-full mt-auto ${tier.buttonColor}`}>捐赠 ${tier.amount}</Button>
            </div>
          ))}
        </div>

        {/* 自定义捐赠 */}
        <div className="minecraft-card p-8 mb-16">
          <h2 className="text-2xl font-pixel mb-4 text-center">自定义捐赠金额</h2>
          <p className="text-center text-muted-foreground mb-6">想要捐赠其他金额？在下方选择您的捐赠金额。</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[5, 20, 30, 75, 200].map((amount) => (
              <Button key={amount} variant="outline" className="minecraft-card">
                ${amount}
              </Button>
            ))}
            <Button className="minecraft-btn">自定义金额</Button>
          </div>
        </div>

        {/* 我们的支持者 */}
        <div>
          <h2 className="text-3xl font-pixel mb-8 text-center">我们的支持者</h2>

          {/* 钻石支持者 */}
          <div className="mb-10">
            <h3 className="text-xl font-pixel mb-4 flex items-center">
              <i className="fas fa-crown text-blue-400 mr-2"></i> 钻石支持者
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DIAMOND_DONORS.map((donor) => (
                <div key={donor.id} className="minecraft-card p-4 flex gap-4 border-blue-400">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={donor.avatar || "/placeholder.svg"} alt={donor.name} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-pixel text-lg">{donor.name}</h4>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${TIER_INFO[donor.tier].bg}`}>
                        <i className={`fas fa-${TIER_INFO[donor.tier].icon} ${TIER_INFO[donor.tier].color}`}></i>
                        <span className="text-xs font-medium">{TIER_INFO[donor.tier].label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{donor.message}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>捐赠 ${donor.amount}</span>
                      <span>{new Date(donor.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 黄金支持者 */}
          <div className="mb-10">
            <h3 className="text-xl font-pixel mb-4 flex items-center">
              <i className="fas fa-star text-yellow-400 mr-2"></i> 黄金支持者
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GOLD_DONORS.map((donor) => (
                <div key={donor.id} className="minecraft-card p-4 flex gap-4 border-yellow-400">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={donor.avatar || "/placeholder.svg"} alt={donor.name} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-pixel text-lg">{donor.name}</h4>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${TIER_INFO[donor.tier].bg}`}>
                        <i className={`fas fa-${TIER_INFO[donor.tier].icon} ${TIER_INFO[donor.tier].color}`}></i>
                        <span className="text-xs font-medium">{TIER_INFO[donor.tier].label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{donor.message}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>捐赠 ${donor.amount}</span>
                      <span>{new Date(donor.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 铁质支持者 */}
          <div>
            <h3 className="text-xl font-pixel mb-4 flex items-center">
              <i className="fas fa-shield-alt text-gray-400 mr-2"></i> 铁质支持者
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {IRON_DONORS.map((donor) => (
                <div key={donor.id} className="minecraft-card p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={donor.avatar || "/placeholder.svg"} alt={donor.name} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-pixel text-lg">{donor.name}</h4>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${TIER_INFO[donor.tier].bg}`}>
                        <i className={`fas fa-${TIER_INFO[donor.tier].icon} ${TIER_INFO[donor.tier].color}`}></i>
                        <span className="text-xs font-medium">{TIER_INFO[donor.tier].label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{donor.message}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>捐赠 ${donor.amount}</span>
                      <span>{new Date(donor.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-pixel mb-6 text-center">常见问题</h2>

          <div className="space-y-6">
            <div className="minecraft-card p-6">
              <h3 className="font-pixel text-lg mb-2">捐赠如何使用？</h3>
              <p className="text-muted-foreground">
                所有捐赠直接用于支持我们的翻译团队、服务器成本以及开发新的翻译工具，以提高我们翻译的质量和速度。
              </p>
            </div>

            <div className="minecraft-card p-6">
              <h3 className="font-pixel text-lg mb-2">捐赠可以抵税吗？</h3>
              <p className="text-muted-foreground">
                目前，PixelLingual不是注册的非营利组织，因此捐赠不能抵税。我们正在努力在未来改变这一点。
              </p>
            </div>

            <div className="minecraft-card p-6">
              <h3 className="font-pixel text-lg mb-2">我不在美国，可以捐赠吗？</h3>
              <p className="text-muted-foreground">是的！我们接受来自世界各地的捐赠。支付处理器将自动转换您的货币。</p>
            </div>

            <div className="minecraft-card p-6">
              <h3 className="font-pixel text-lg mb-2">如何让我的名字出现在支持者列表中？</h3>
              <p className="text-muted-foreground">
                任何10美元或以上的捐赠都会将您的名字添加到我们的支持者列表中。您可以在捐赠过程中添加您的名字和可选的留言。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

