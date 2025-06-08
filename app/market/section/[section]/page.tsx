import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getPacksBySectionId, getSectionTitleById } from "@/data/translation-packs";
// 注意：这里不再需要客户端相关的 hooks 和组件

interface PageProps {
  params: {
    section: string;
  };
}

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sectionId = params.section;
  const sectionTitle = getSectionTitleById(sectionId);
  const packs = getPacksBySectionId(sectionId);

  // 为未找到的 section 提供通用元数据
  if (!sectionTitle || packs.length === 0) {
    return {
      title: "推荐类别未找到 | PixelLingual像素语匠",
      description: "您查找的翻译包推荐类别不存在或其中没有内容。",
    };
  }

  // 为找到的 section 提供具体元数据
  // 可以根据实际内容调整 description 和 keywords
  const description = `浏览 PixelLingual 像素语匠中 ${sectionTitle} 类别的所有高质量 Minecraft 基岩版翻译包。发现最新、最热门的汉化内容！`;
  const keywords = [`${sectionTitle} 翻译包`, `Minecraft ${sectionTitle} 汉化`, "PixelLingual", "基岩版翻译", "MCBE 翻译"];

  // 尝试找到一个封面图片，如果没有，可以使用默认占位符
  const firstPackImage = packs.length > 0 ? packs[0].image : "/placeholder.svg";

  return {
    title: `${sectionTitle} 类别翻译包 | PixelLingual像素语匠`,
    description: description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${sectionTitle} 类别翻译包 - PixelLingual像素语匠`,
      description: description,
      images: [
        {
          url: firstPackImage,
          width: 1200, // 建议的OG图片宽度
          height: 630, // 建议的OG图片高度
          alt: `${sectionTitle} Translations`,
        }
      ],
      type: "website", // 对于分类页，通常是 website 类型
    },
    twitter: {
      card: "summary_large_image",
      title: `${sectionTitle} 翻译包 - PixelLingual`,
      description: description,
      images: [firstPackImage],
    },
  };
}


// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
import SectionClient from "./section-client"; // 👈 导入客户端组件

export default async function SectionPage({ params }: PageProps) {
  const { section } = params;

  const sectionTitle = getSectionTitleById(section);
  const sectionPacks = getPacksBySectionId(section);

  // 如果标题或包为空，则显示未找到页面（服务器端渲染）
  // 客户端组件中也会处理 this.sectionPacks.length === 0 的情况，
  // 但在服务器端这里可以提供一个快速失败和友好的用户体验。
  if (!sectionTitle || sectionPacks.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
        <p className="text-muted-foreground">
          我们无法在 "{sectionTitle || section}" 部分找到任何翻译包。
        </p>
        <Button asChild className="minecraft-btn mt-4">
          <Link href="/market">返回市场</Link>
        </Button>
      </div>
    );
  }

  // 将数据传递给客户端组件
  return (
    <SectionClient
      initialSectionPacks={sectionPacks}
      initialSectionTitle={sectionTitle}
      sectionId={section}
    />
  );
}