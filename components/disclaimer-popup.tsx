"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DisclaimerPopupProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  packTitle: string
}

export default function DisclaimerPopup({ isOpen, onClose, onAccept, packTitle }: DisclaimerPopupProps) {
  const [accepted, setAccepted] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAccepted(false)
    }
  }, [isOpen])

  const handleAccept = () => {
    if (dontShowAgain) {
      localStorage.setItem("disclaimerAccepted", "true")
    }
    onAccept()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-pixel text-xl">下载免责声明</DialogTitle>
          <DialogDescription>
            请您在下载{packTitle} 前阅读并接受以下免责声明。
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto my-4 pr-2 custom-scrollbar flex-grow">
          <div className="minecraft-card p-4">
            <p className="mb-4">通过下载此翻译包，您承认并同意以下内容：</p>
            <h1 id="minecraft地图汉化包版权声明">Minecraft地图汉化包版权声明 </h1>
              <h2 id="前言">前言 </h2>
              <p>本版权声明（"声明"）由提供Minecraft地图汉化包（以下简称"汉化包"）的民间翻译组织（以下简称"我们"或"译者团队"）制定。本声明旨在明确汉化包的使用条款与限制，保护翻译作品的知识产权，并尊重原创作者的权利。请所有下载和使用本汉化包的用户（以下简称"用户"或"您"）仔细阅读本声明的全部内容。</p>
              <h2 id="一-版权归属">一、版权归属 </h2>
              <p>1.1 本汉化包中的所有中文翻译内容均由译者团队独立完成，其版权归译者团队所有。</p>
              <p>1.2 原Minecraft地图的所有创意内容、设计元素、游戏机制、故事情节等非文本内容的知识产权归原地图创作者所有。</p>
              <p>1.3 我们仅对汉化包中的中文翻译文本主张权利，这些翻译文本受中华人民共和国著作权法及国际著作权公约的保护。</p>
              <p>1.4 本汉化包是基于对原创作品的尊重和热爱而创作的衍生作品，旨在为中文用户提供更好的游戏体验。</p>
              <h2 id="二-使用授权与限制">二、使用授权与限制 </h2>
              <p>2.1 个人使用授权：我们授权用户将本汉化包用于个人、非商业目的，以增强您的Minecraft游戏体验。</p>
              <p>2.2 严格禁止的行为：<br/>
              a) 以任何形式对本汉化包进行修改、反编译、解包或重新封装；<br/>
              b) 删除、掩盖或更改本汉化包中包含的任何版权声明、免责声明或其他法律声明；<br/>
              c) 将本汉化包用于任何商业目的，包括但不限于销售、出租、租赁或以其他方式谋取经济利益；<br/>
              d) 将本汉化包的部分或全部内容整合到其他项目中，除非获得我们的书面许可；<br/>
              e) 声称本汉化包为您的作品或暗示您拥有本汉化包的版权；<br/>
              f) 将本汉化包与任何违反法律法规的内容或活动相关联。</p>
              <p>2.3 二次分发限制：<br/>
              a) 严禁在未经我们明确书面授权的情况下在任何平台上重新分发本汉化包；<br/>
              b) 如需分享本汉化包，请直接分享原始下载链接，而非汉化文件本身；<br/>
              c) 禁止在任何需要注册、付费或包含广告的网站上托管本汉化包；<br/>
              d) 禁止将本汉化包与其他模组或资源包捆绑分发，除非获得我们的书面授权。</p>
              <p>2.4 教育与研究使用：<br/>
              a) 允许在教育环境中使用本汉化包作为教学或研究目的，但必须注明出处并尊重本声明的其他条款；<br/>
              b) 如需在学术研究、论文或出版物中引用本汉化包的内容，请事先联系我们获取许可。</p>
              <h2 id="三-免责条款">三、免责条款 </h2>
              <p>3.1 "按现状"提供：本汉化包按"现状"提供，不提供任何形式的保证，无论是明示的还是暗示的。</p>
              <p>3.2 风险承担：用户使用本汉化包的风险完全由用户自行承担。译者团队不对使用本汉化包可能导致的任何直接或间接损失承担责任，包括但不限于游戏崩溃、存档损坏、数据丢失或其他任何形式的损失。</p>
              <p>3.3 兼容性问题：我们不保证本汉化包与所有Minecraft版本、模组或其他资源包兼容。用户应自行测试兼容性，并承担相关风险。</p>
              <p>3.4 更新与维护：译者团队保留决定是否提供汉化包更新或维护的权利，且无需事先通知。我们不承诺为未来版本的Minecraft或原地图的更新提供相应的汉化更新。</p>
              <p>3.5 第三方内容：对于汉化包可能包含的任何第三方内容，我们不对其准确性、合法性或版权状态做出任何保证。</p>
              <h2 id="四-侵权举报与责任">四、侵权举报与责任 </h2>
              <p>4.1 举报渠道：如发现任何个人或组织违反本版权声明，请通过以下方式联系我们：<br/>
              <a href="mailto:Fanconma@gmail.com">Fanconma@gmail.com</a></p>
              <p>4.2 法律行动：对于侵犯我们版权的行为，我们保留采取法律行动追究责任的权利。</p>
              <p>4.3 侵权赔偿：任何未经授权使用、修改或分发本汉化包的行为可能导致侵权责任，包括但不限于赔偿经济损失、公开道歉等。</p>
              <p>4.4 协助调查：用户同意在发现侵权行为时，在合理范围内协助我们进行调查和取证。<br/>
              五、声明的修改与终止。</p>
              <p>5.1 修改权：译者团队保留随时修改本版权声明的权利，修改后的版本将在我们的官方发布渠道上公布，并自公布之日起生效。</p>
              <p>5.2 终止使用：如您不同意本声明的任何条款或未来的修改，您必须立即停止使用并删除本汉化包。</p>
              <p>5.3 持续有效：即使您停止使用本汉化包，本声明中关于知识产权、免责条款和侵权责任的条款仍将继续有效。</p>
              <h2 id="六-一般条款">六、一般条款 </h2>
              <p>6.1 完整协议：本版权声明构成您与我们之间关于汉化包使用的完整协议，替代所有先前的口头或书面协议。</p>
              <p>6.2 可分割性：如本声明的任何条款被认定为无效或不可执行，其余条款仍将保持完全效力。</p>
              <p>6.3 非弃权：我们未能执行本声明的任何权利或条款，不构成对该权利或任何其他权利的放弃。</p>
              <p>6.4 不可转让：未经我们事先书面同意，您不得转让本声明下的任何权利或义务。</p>
              <p>6.5 管辖法律：本声明受中华人民共和国法律管辖，并依其解释。</p>
              <h2 id="结语">结语 </h2>
              <p>下载并使用本汉化包即表示您已阅读、理解并同意遵守以上所有条款。如有任何疑问，请在使用前联系我们获取解答。</p>
              <p>译者团队保留对本汉化包及本版权声明的最终解释权。</p>
              <p>最后更新日期：2025年4月5日</p>
              <br/>
              <h1 id="translation-disclaimer-for-minecraft-map-chinese-localization">Translation Disclaimer for Minecraft Map Chinese Localization </h1>
              <p>This Chinese localization package ("Translation") for the Minecraft map is a fan-made translation project created for educational and entertainment purposes by a non-commercial community organization. The original Minecraft map, including all original designs, structures, mechanisms, and storylines, remains the intellectual property of its original creator(s), while all Chinese text content included in this Translation has been independently translated and is the intellectual property of our translation team. We claim rights only to the translated Chinese text elements, not to any original map designs, concepts, or mechanics. This Translation is provided on a non-commercial basis and is not for sale, with no revenue being generated from its distribution. Our Translation is not officially affiliated with, endorsed by, or connected to the original map creator(s) - this is an independent fan project created to make the original content accessible to Chinese-speaking players. The Translation is provided "as is" without warranty of any kind, express or implied; we do not guarantee the accuracy, completeness, or quality of the Translation, and users download and use this Translation at their own risk. Should the original content creator(s) believe their rights have been infringed by this Translation, they may contact us with evidence of ownership, and we will promptly remove the Translation from distribution upon verification. We recognize and respect the intellectual property rights of the original creators and will cooperate fully with any legitimate copyright concerns. We respect the creative work of all content creators and have created this Translation out of appreciation for the original work. This Translation is intended for personal, non-commercial use only and may not be redistributed, modified, or used for any commercial purposes. We have made every reasonable effort to respect the rights of the original creators while providing this service to the Chinese-speaking Minecraft community. By downloading, installing, or using this Translation, you acknowledge that you have read and agreed to the terms of this disclaimer, and you agree to use the Translation in a manner consistent with these terms and with respect for both the original creators and our translation team.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="accept" checked={accepted} onCheckedChange={(checked) => setAccepted(checked as boolean)} />
          <label
            htmlFor="accept"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            我已阅读并接受免责声明
          </label>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="dontShowAgain"
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          />
          <label
            htmlFor="dontShowAgain"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            不再显示此免责声明
          </label>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button className="minecraft-btn" disabled={!accepted} onClick={handleAccept}>
            接受 & 下载
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

