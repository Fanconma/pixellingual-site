import { Metadata } from 'next'; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  getPackById,
  getPacksByStudio,
  getPacksByTag,
  TranslationPack, // 导入 TranslationPack 类型
} from "@/data/translation-packs";
// 注意：这里不再需要客户端相关的 hooks 和组件

interface PageProps {
  params: {
    id: string;
  };
}

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: packId } = await params;
  const pack = getPackById(packId);

  if (!pack) {
    return {
      title: "翻译包未找到 | PixelLingual像素语匠",
      description: "您查找的翻译包不存在或已被移除。",
    };
  }

  return {
    title: `${pack.title}翻译包 | PixelLingual像素语匠`,
    description: pack.description,
    keywords: `${pack.title} 中文翻译, ${pack.tags.join(", ")}, Minecraft基岩版翻译, ${pack.studio} 翻译`,
    openGraph: {
      title: `${pack.title} - PixelLingual`,
      description: pack.description,
      images: [pack.image], // 确保 image 属性是一个 URL 字符串
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pack.title} - PixelLingual`,
      description: pack.description,
      images: [pack.image], // 确保 image 属性是一个 URL 字符串
    },
  };
}

// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
import TranslationPackDetailClient from "./translation-pack-detail-client"; 

export default async function TranslationPackDetailPage({ params }: PageProps) {
  const { id: packId } = await params;

  const pack = getPackById(packId);

  // 处理翻译包未找到的情况 (服务器端渲染)
  if (!pack) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-pixel mb-4">翻译包未找到</h2>
        <p className="text-muted-foreground mb-8">
          您正在寻找的翻译包不存在或因某些原因已被移除。
        </p>
        <Button asChild className="minecraft-btn">
          <Link href="/market">返回市场</Link>
        </Button>
      </div>
    );
  }

  // 在服务器端获取相关联的数据
  const studioPacksData = getPacksByStudio(pack.studio, pack.id).slice(0, 4);
  let similarPacksData: TranslationPack[] = [];
  if (pack.tags.length > 0) {
    const randomTag = pack.tags[Math.floor(Math.random() * pack.tags.length)];
    similarPacksData = getPacksByTag(randomTag, pack.id).slice(0, 4);
  }

  // 将获取到的数据作为 prop 传递给客户端组件
  return (
    <TranslationPackDetailClient
      initialPack={pack}
      initialStudioPacks={studioPacksData}
      initialSimilarPacks={similarPacksData}
    />
  );
}

// 注意：格式化日期函数不再需要在 `page.tsx` 中，因为现在它在 `translation-pack-detail-client.tsx` 中使用。