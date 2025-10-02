import { Metadata } from 'next';
// 确保所有数据源都只在此服务器组件中导入
import {
  ALL_PACKS, // ALL_PACKS 在这里导入，但不会传给客户端，而是通过 API 懒加载
  FEATURED_PACKS,
  TAGS,
  STUDIOS,
  SECTIONS,
  getMostRecentPacks,
  TranslationPack,
  Section, // 导入 Section 类型
  getPacksBySectionId, // 在服务器端使用
} from "@/data/translation-packs";
import MarketClient from "./market-client";

interface PageProps {
  searchParams: Promise<{
    tag?: string | string[];
    q?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
}

// 辅助函数：格式化标签以供显示 (不变)
function formatTagForDisplay(tagSlug: string): string {
  try {
    const decodedTag = decodeURIComponent(tagSlug);
    return decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);
  } catch (error) {
    console.error("Error decoding tag slug:", tagSlug, error);
    return String(tagSlug).charAt(0).toUpperCase() + String(tagSlug).slice(1);
  }
}

// generateMetadata 函数 (不变)
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const awaitedSearchParams = await searchParams;

  const selectedTagFromUrl = Array.isArray(awaitedSearchParams.tag) ? awaitedSearchParams.tag[0] : awaitedSearchParams.tag ?? null;
  const searchQueryFromUrl = Array.isArray(awaitedSearchParams.q) ? awaitedSearchParams.q[0] : awaitedSearchParams.q ?? "";

  let pageTitle = "翻译包市场 | PixelLingual像素语匠";
  let description = "浏览PixelLingual的Minecraft中文翻译市场。免费下载高质量的游戏内容翻译，提升您的游戏体验。";
  let keywords = "Minecraft中文翻译, 基岩版翻译包, 免费Minecraft资源, 游戏中文本地化, Minecraft资源市场, 我的世界汉化";
  const ogUrl = "https://pling.top/market";

  if (selectedTagFromUrl) {
    const formattedTag = formatTagForDisplay(selectedTagFromUrl);
    pageTitle = `${formattedTag}类翻译包 | PixelLingual像素语匠`;
    description = `浏览PixelLingual的Minecraft的${formattedTag}类别翻译包。找到适合您的高质量Minecraft中文翻译资源。`;
    keywords = `Minecraft ${formattedTag}翻译包, 中文${formattedTag}资源包, Minecraft基岩版翻译, ${formattedTag}中文本地化, ${formattedTag}翻译`;
  } else if (searchQueryFromUrl) {
    pageTitle = `搜索 "${searchQueryFromUrl}" | PixelLingual像素语匠`;
    description = `在PixelLingual市场搜索Minecraft翻译包：“${searchQueryFromUrl}”。`;
    keywords = `Minecraft翻译搜索, ${searchQueryFromUrl}, 游戏汉化搜索`;
  }

  const ogImage = "/images/market.jpeg";

  return {
    title: pageTitle,
    description: description,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: description,
      url: ogUrl,
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 400,
          alt: "Minecraft marketplace background",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: [ogImage],
    },
  };
}

// 页面组件 (服务器组件)
export default async function MarketPage({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams;

  const selectedTag = Array.isArray(awaitedSearchParams.tag) ? awaitedSearchParams.tag[0] : awaitedSearchParams.tag ?? null;
  const searchQuery = Array.isArray(awaitedSearchParams.q) ? awaitedSearchParams.q[0] : awaitedSearchParams.q ?? "";

  const initialIsSearching = !!searchQuery;

  let serverFilteredPacks: TranslationPack[] = [];

  if (selectedTag || searchQuery) {
      serverFilteredPacks = ALL_PACKS;
      if (selectedTag) {
          serverFilteredPacks = serverFilteredPacks.filter((pack) =>
              pack.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
          );
      }
      if (searchQuery) {
          const query = searchQuery.toLowerCase();
          serverFilteredPacks = serverFilteredPacks.filter(
              (pack) =>
                  pack.title.toLowerCase().includes(query) ||
                  pack.description.toLowerCase().includes(query) ||
                  pack.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                  pack.author.toLowerCase().includes(query) ||
                  pack.studio.toLowerCase().includes(query),
          );
      }
  }

  // 服务器端获取并处理所有数据，然后传递给客户端组件
  const recentPacks = getMostRecentPacks(3);
  const featuredPacks = FEATURED_PACKS;
  const tags = TAGS;
  const studios = STUDIOS;

  // 预处理 sections，将每个 section 相关的 packs 附加进去
  const sectionsWithPacks = SECTIONS.map(section => ({
    ...section,
    packs: getPacksBySectionId(section.id), // 在服务器端获取
  })).filter(section => section.packs.length > 0); // 过滤掉没有 packs 的 sections

  return (
    <MarketClient
      initialFilteredPacks={serverFilteredPacks}
      initialSelectedTag={selectedTag}
      initialSearchQuery={searchQuery}
      initialIsSearching={initialIsSearching}
      recentPacks={recentPacks}
      featuredPacks={featuredPacks}
      tags={tags}
      studios={studios}
      sections={sectionsWithPacks} // 传递预处理过的 sections
    />
  );
}