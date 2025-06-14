import { Metadata } from 'next'; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ALL_PACKS, TranslationPack } from "@/data/translation-packs"; // 导入 ALL_PACKS 和 TranslationPack 类型
// 导入客户端组件
import TagClient from "./tag-client";

interface PageProps {
  params: Promise< {
    tag: string; // URL 编码后的标签 slug
  }>;
}

// 辅助函数：格式化标签以供显示
function formatTagForDisplay(tagSlug: string): string {
  const decodedTag = decodeURIComponent(tagSlug);
  return decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);
}

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const awaitedParams = await params; // 等待 params 解析完成
  const decodedTag = decodeURIComponent(awaitedParams.tag);
  const formattedTag = formatTagForDisplay(awaitedParams.tag);

  // 在服务器端过滤包以获取元数据相关信息
  const filteredPacks = ALL_PACKS.filter((pack) =>
    pack.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  let description: string;
  let keywords: string;
  let ogImage: string = "/placeholder.svg"; // 默认占位符图片

  if (filteredPacks.length > 0) {
    description = `浏览PixelLingual的${formattedTag}类别翻译包。找到适合您的高质量Minecraft中文翻译资源。`;
    keywords = `Minecraft ${formattedTag}翻译包, 中文${formattedTag}资源包, Minecraft基岩版翻译, ${formattedTag}中文本地化, ${formattedTag}翻译, ${formattedTag}模组翻译`;
    // 使用第一个包的图片作为 OG 图片
    ogImage = filteredPacks[0].image || "/placeholder.svg";
  } else {
    // 如果该标签下未找到任何包
    description = `我们无法找到任何带有标签"${formattedTag}"的翻译包。`;
    keywords = `未找到翻译包, ${formattedTag}翻译, Minecraft翻译`;
    // ogImage 保持为默认值
  }

  return {
    title: `${formattedTag}类翻译包 | PixelLingual像素语匠`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: `${formattedTag}类翻译包 - PixelLingual`,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200, // 建议的 OG 图片宽度
          height: 630, // 建议的 OG 图片高度
          alt: `${formattedTag} Translations`,
        }
      ],
      type: "website", // 对于分类页面，通常是 "website" 类型
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTag}类翻译包 - PixelLingual`,
      description: description,
      images: [ogImage],
    },
  };
}

// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
export default async function TagPage({ params }: PageProps) {
  const awaitedParams = await params; // 等待 params 解析完成
  const { tag } = awaitedParams;
  const decodedTag = decodeURIComponent(tag); // 解码 URL 参数
  const formattedTag = formatTagForDisplay(tag); // 格式化用于显示

  // 在服务器组件中根据标签过滤包
  const tagPacks = ALL_PACKS.filter((pack) =>
    pack.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  // 如果该标签下没有找到包，则直接在服务器端渲染一个“未找到”页面
  if (tagPacks.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
        <p className="text-muted-foreground">
          我们无法找到任何带有标签"{formattedTag}"的翻译包。
        </p>
        <Button asChild className="minecraft-btn mt-4">
          <Link href="/market">返回市场</Link>
        </Button>
      </div>
    );
  }

  // 将过滤后的包和格式化后的标签传递给客户端组件
  return (
    <TagClient
      initialTagPacks={tagPacks}
      formattedTag={formattedTag}
    />
  );
}