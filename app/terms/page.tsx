import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container py-12">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回首页
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-pixel mb-6">服务条款</h1>
        <p className="text-sm text-muted-foreground mb-8">最后更新：2025 年 4 月 6 日</p>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">1. 简介</h2>
          <p className="mb-4">
          欢迎来到 PixelLingual（或“像素语匠”，以下统称"PixelLingual"）。这些服务条款（以下简称“条款”）约束您对 PixelLingual 网站、服务和翻译包（统称为“服务”）的使用。
          </p>
          <p className="mb-4">
          通过访问或使用本服务，您同意受本条款约束。如果您不同意本条款的任何部分，请您立即退出 PixelLingual 网站并暂停使用 PixelLingual 的一切服务。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">2. 定义</h2>
          <ul className="space-y-2">
            <li>
              <strong>"PixelLingual"</strong>指我们的组织、网站和服务。
            </li>
            <li>
              <strong>"翻译包"</strong>指通过我们的服务提供的适用于 Minecraft Bedrock Edition(我的世界基岩版) 的资源包文件。
            </li>
            <li>
              <strong>"用户"</strong>指访问或使用我们服务的个人。
            </li>
            <li>
              <strong>"Mojang"</strong>指的是Minecraft(我的世界)的开发商Mojang AB(瑞典魔赞工作室)。
            </li>
            <li>
              <strong>"Microsoft"</strong>指的是 Mojang AB 的所有者微软公司(Microsoft Corporation)。
            </li>
          </ul>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">3. 服务的使用</h2>
          <h3 className="font-pixel text-lg mb-2">3.1 资格</h3>
          <p className="mb-4">
            您必须年满 13 岁才能使用本服务。使用本服务即表示您声明并保证您符合此要求。
          </p>

          <h3 className="font-pixel text-lg mb-2">3.2 第三方账户需求</h3>
          <p className="mb-4">
            某些服务功能可能要求您注册或登录与第三方平台相关的帐户（非 PixelLingual 账户）。这些第三方平台可能包括但不限于社交媒体、支付处理服务或其他外部服务提供商。您需自行确保第三方账户的创建和使用遵守其相应的使用条款及隐私政策。PixelLingual 对第三方平台上的操作及账户安全不承担责任。如需协助设置第三方账户，请参考相关平台的帮助文档或联系客服。
          </p>

          <h3 className="font-pixel text-lg mb-2">3.3 可接受的使用</h3>
          <p className="mb-4">
            您同意不将服务用于任何非法或本条款禁止的目的。您不得：
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>以任何可能禁用、超载或损害服务的方式使用服务</li>
            <li>使用任何机器人、蜘蛛或其他自动设备访问服务</li>
            <li>引入任何病毒、木马、蠕虫或其他有害材料</li>
            <li>试图未经授权访问服务的任何部分</li>
            <li>干扰任何其他用户对服务的使用</li>
          </ul>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">4. 翻译包</h2>
          <h3 className="font-pixel text-lg mb-2">4.1 所有权和许可</h3>
          <p className="mb-4">
          PixelLingual 的翻译包仅供个人非商业使用。我们授予您有限、非独占、不可转让的许可，供您下载和使用 Minecraft Bedrock Edition 的翻译包。
          </p>

          <h3 className="font-pixel text-lg mb-2">4.2 限制</h3>
          <p className="mb-4">您不得：</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>重新分发、出售、出租或再授权翻译包</li>
            <li>从翻译包中删除所有版权或所有权声明</li>
            <li>未经适当署名而修改或基于翻译包创建衍生作品</li>
            <li>使用翻译包用于任何商业目的</li>
          </ul>

          <h3 className="font-pixel text-lg mb-2">4.3 第三方内容</h3>
          <p className="mb-4">
          我们的翻译包可能包含 Mojang、Microsoft 或第三方创作者所创作内容的翻译。原始内容的所有权利仍归其各自所有者所有。
          </p>
          <h3 className="font-pixel text-lg mb-2">4.4 其它</h3>
          <p className="mb-4">
          有关翻译包的其它服务条款，参见首次下载翻译包时弹出弹窗内容。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">5. 知识产权</h2>
          <p className="mb-4">
            该服务及其原始内容、特征和功能归 PixelLingual 所有，并受国际版权、商标和其他知识产权法的保护。
          </p>
          <p className="mb-4">
          Minecraft 是 Mojang AB 的商标。PixelLingual 与 Mojang AB 或 Microsoft 没有任何关联、支持或联系。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">6. 免责声明</h2>
          <p className="mb-4">
          服务和翻译包是“按原样”和“按可用”提供的，不提供任何明示或暗示的保证，包括但不限于适销性、适用于特定目的或不侵权的暗示保证。
          </p>
          <p className="mb-4">
          PixelLingual 不保证服务不会中断或出现错误、缺陷将得到纠正，或服务没有病毒或其他有害组件。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">7. 责任限制</h2>
          <p className="mb-4">
          在任何情况下，PixelLingual 均不对因您访问、使用或无法访问或使用服务而导致的任何间接、偶然、特殊、结果性或惩罚性损害负责，包括但不限于利润损失、数据损失、使用损失、商誉损失或其他无形损失。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">8. 条款变更</h2>
          <p className="mb-4">
          我们保留随时修改或替换这些条款的权利。如果修订内容重大，我们将在任何新条款生效前至少提前 30 天通知。什么构成重大变更将由我们自行决定。
          </p>
          <p className="mb-4">
          在任何修订生效后继续访问或使用我们的服务，即表示您同意受修订条款的约束。如果您不同意新条款，您将不再被授权使用该服务。
          </p>
        </div>

        <div className="minecraft-card p-6 mb-8">
          <h2 className="text-xl font-pixel mb-4">9. 联系我们</h2>
          <p className="mb-4">如果您对这些条款有任何疑问，请通过以下方式联系我们：</p>
          <p className="mb-4">
            Email: Fanconma@gmail.com
            <br />
            QQ群：286220217
            <br />
            Discord: Join our{" "}
            <Link href="https://discord.gg/m2mQScdxed" className="text-primary hover:underline">
              Discord server
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

