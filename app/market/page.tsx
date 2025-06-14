import { Metadata } from 'next';
// 移除所有客户端相关的导入和逻辑
import {
  ALL_PACKS,
  FEATURED_PACKS,
  TAGS,
  STUDIOS,
  SECTIONS,
  getMostRecentPacks,
} from "@/data/translation-packs"; // 确保路径正确
import MarketClient from "./market-client"; // 导入客户端组件，确保路径正确

interface PageProps {
  // 修正：明确 searchParams 的值现在是一个 Promise
  searchParams: Promise<{
    tag?: string | string[]; // 'tag' 参数可能是一个字符串或字符串数组
    q?: string | string[];   // 'q' (query) 参数可能是一个字符串或字符串数组
    [key: string]: string | string[] | undefined; // 允许其他未明确定义的参数
  }>;
}

// 辅助函数：格式化标签以供显示 (在服务器组件和客户端组件中可能都需要)
function formatTagForDisplay(tagSlug: string): string {
  try {
    const decodedTag = decodeURIComponent(tagSlug);
    return decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);
  } catch (error) {
    // 如果解码失败 (例如，URL参数格式不正确), 返回原始标签或默认值
    console.error("Error decoding tag slug:", tagSlug, error);
    // 确保这里返回的是字符串
    return String(tagSlug).charAt(0).toUpperCase() + String(tagSlug).slice(1);
  }
}

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  // 修正：使用 Array.isArray 确保只取第一个值或处理为字符串

  const awaitedSearchParams = await searchParams;


  const selectedTagFromUrl = Array.isArray(awaitedSearchParams.tag) ? awaitedSearchParams.tag[0] : awaitedSearchParams.tag ?? null;
  const searchQueryFromUrl = Array.isArray(awaitedSearchParams.q) ? awaitedSearchParams.q[0] : awaitedSearchParams.q ?? "";

  let pageTitle = "翻译包市场 | PixelLingual像素语匠";
  let description = "浏览PixelLingual的Minecraft中文翻译市场。免费下载高质量的游戏内容翻译，提升您的游戏体验。";
  let keywords = "Minecraft中文翻译, 基岩版翻译包, 免费Minecraft资源, 游戏中文本地化, Minecraft资源市场, 我的世界汉化";
  const ogUrl = "https://pling.top/market"; // 市场的固定URL

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

  // 默认 OG 图像
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
          width: 1920, // 适应你的背景图尺寸
          height: 400, // 适应你的背景图尺寸
          alt: "Minecraft marketplace background",
        },
      ],
      type: "website", // 对于主市场页面，通常是 "website" 类型
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: [ogImage],
    },
  };
}

// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
export default async function MarketPage({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams; // [1]

  const selectedTag = Array.isArray(awaitedSearchParams.tag) ? awaitedSearchParams.tag[0] : awaitedSearchParams.tag ?? null;
  const searchQuery = Array.isArray(awaitedSearchParams.q) ? awaitedSearchParams.q[0] : awaitedSearchParams.q ?? "";

  // 在服务器端执行初始过滤
  let initialFilteredPacks = ALL_PACKS;
  if (selectedTag) { // 确保 selectedTag 是一个字符串或 null
    initialFilteredPacks = initialFilteredPacks.filter((pack) =>
      pack.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
    );
  }
  if (searchQuery) { // 确保 searchQuery 是一个字符串
    const query = searchQuery.toLowerCase();
    initialFilteredPacks = initialFilteredPacks.filter(
      (pack) =>
        pack.title.toLowerCase().includes(query) ||
        pack.description.toLowerCase().includes(query) ||
        pack.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        pack.author.toLowerCase().includes(query) ||
        pack.studio.toLowerCase().includes(query),
    );
  }

  // 获取其他静态或预计算数据
  const recentPacks = getMostRecentPacks(3); // 服务器端获取
  const featuredPacks = FEATURED_PACKS; // 直接引用常量
  const tags = TAGS; // 直接引用常量
  const studios = STUDIOS; // 直接引用常量
  const sections = SECTIONS; // 直接引用常量

  // 判断是否处于搜索状态
  const initialIsSearching = !!searchQuery;

  return (
    <MarketClient
      initialFilteredPacks={initialFilteredPacks}
      initialSelectedTag={selectedTag}
      initialSearchQuery={searchQuery}
      initialIsSearching={initialIsSearching}
      recentPacks={recentPacks}
      featuredPacks={featuredPacks}
      tags={tags}
      studios={studios}
      sections={sections}
    />
  );
}