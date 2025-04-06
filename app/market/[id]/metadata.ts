import { getPackById } from "@/data/translation-packs"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const packId = Number.parseInt(params.id, 10)
  const pack = getPackById(packId)

  if (!pack) {
    return {
      title: "翻译包 | PixelLingual - Minecraft中文翻译社区",
      description: "浏览PixelLingual的Minecraft中文翻译包。找到适合您的高质量游戏内容翻译。",
    }
  }

  return {
    title: `${pack.title} | PixelLingual - Minecraft中文翻译社区`,
    description: pack.description,
    keywords: `${pack.title} 中文翻译, ${pack.tags.join(", ")}, Minecraft基岩版翻译, ${pack.studio} 翻译`,
  }
}
