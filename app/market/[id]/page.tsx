import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  getPackById,
  getPacksByStudio,
  getPacksByTag,
  TranslationPack, // 导入 TranslationPack 类型
  STUDIOS, // <-- ADDED: Import STUDIOS for metadata
  getLanguageDisplayName, // <-- ADDED: Import getLanguageDisplayName for metadata
} from "@/data/translation-packs";

import TranslationPackDetailClient from "./translation-pack-detail-client";

interface PageProps {
  params: {
    id: string;
  };
}

// --------------------------------------------------------
// Helper function for Metadata (OG Image) - Adjusted for clarity
// --------------------------------------------------------
// This function is generally for displaying a formatted date for humans,
// The OG API's `createdAt` parameter expects the raw YYYYMMDD string from the data.
// So, this function is NOT used for passing to the OG API, but kept if you need it elsewhere for display.
const formatDateForDisplay = (dateString: string | undefined | null) => {
  if (!dateString || dateString.length !== 8) {
    return "N/A";
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
};

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: packId } = params;
  const pack = getPackById(packId);

  if (!pack) {
    return {
      title: "翻译包未找到 | PixelLingual像素语匠",
      description: "您查找的翻译包不存在或已被移除。",
    };
  }

  // --- prepare data for the OG image URL search parameters ---
  // 查找完整的工作室名称
  const studioFullName = STUDIOS.find((s) => s.id === pack.studio)?.name || pack.studio;
  // `pack.updatedAt` 假设已经是 YYYYMMDD 格式，直接用于 OG API 的 createdAt
  const ogCreatedAt = pack.updatedAt || "";

  const ogImageUrl = new URL("/api/og", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  ogImageUrl.searchParams.set("title", pack.title)
  ogImageUrl.searchParams.set("description", pack.description)
  ogImageUrl.searchParams.set("type", "pack")
  ogImageUrl.searchParams.set("studio", studioFullName) // <-- CHANGED: Pass full studio name
  ogImageUrl.searchParams.set("tags", pack.tags.join(", "))
  ogImageUrl.searchParams.set("rating", pack.rating.toFixed(1))
  ogImageUrl.searchParams.set("price", pack.price.toString())
  // ogImageUrl.searchParams.set("languages", pack.languages.join(", ")) // <-- REMOVED: No longer used by OG API
  ogImageUrl.searchParams.set("author", pack.author)
  ogImageUrl.searchParams.set("coverImage", pack.image || "")
  ogImageUrl.searchParams.set("isFeatured", String(pack.isFeatured || false)) // <-- ADDED: Pass as string
  ogImageUrl.searchParams.set("isDLC", String(pack.isDLC || false))         // <-- ADDED: Pass as string
  ogImageUrl.searchParams.set("createdAt", ogCreatedAt)                   // <-- ADDED: Using pack.updatedAt for createdAt

  return {
    title: `${pack.title}翻译包 | PixelLingual像素语匠`,
    description: pack.description,
    keywords: `${pack.title} 中文翻译, ${pack.tags.join(", ")}, Minecraft基岩版翻译, ${studioFullName} 翻译下载`,
    openGraph: {
      title: `${pack.title}翻译包 - PixelLingual像素语匠`,
      description: pack.description,
      images: [
        {
          url: ogImageUrl.toString(), // <-- NOW uses the custom generated OG image
          width: 1200,
          height: 630,
          alt: pack.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pack.title} - PixelLingual`,
      description: pack.description,
      images: [ogImageUrl.toString()], // <-- NOW also uses the custom generated OG image for consistency
    },
  };
}

// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
export default async function TranslationPackDetailPage({ params }: PageProps) {
  const { id: packId } = params;

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
  // Filter out the current pack from studioPacksData
  const studioPacksData = getPacksByStudio(pack.studio)
    .filter(p => p.id !== pack.id) // Exclude current pack
    .slice(0, 4);

  let similarPacksData: TranslationPack[] = [];
  if (pack.tags.length > 0) {
    const randomTag = pack.tags[Math.floor(Math.random() * pack.tags.length)];
    similarPacksData = getPacksByTag(randomTag)
      .filter(p => p.id !== pack.id) // Exclude current pack
      .slice(0, 4);
  }

  // 评论
  

  // 将获取到的数据作为 prop 传递给客户端组件
  return (
    <TranslationPackDetailClient
      initialPack={pack}
      initialStudioPacks={studioPacksData}
      initialSimilarPacks={similarPacksData}
    />
  );
}

// 注意：格式化日期函数 formatDateForDisplay 仅为可能在页面上显示而保留，不用于OG URL参数。