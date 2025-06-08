import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 导入数据源和类型
import { ALL_PACKS, getStudioById } from "@/data/translation-packs";
// 导入客户端组件
import StudioClient from "./studio-client";

interface PageProps {
  params: {
    studio: string; // studio slug, e.g., "mojang-studios"
  };
}

// --------------------------------------------------------
// 1. generateMetadata 函数 (用于服务器端生成 <head> 标签)
// --------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const studioIdParam = params.studio;
  const studioInfo = getStudioById(studioIdParam); // 在服务器端获取工作室信息

  let formattedStudioName: string;
  let description: string;
  let keywords: string;
  let ogImage: string = "/placeholder.svg"; // 默认占位符图片

  if (studioInfo) {
    formattedStudioName = studioInfo.name;
    description = `浏览工作室${formattedStudioName}的Minecraft中文翻译包。PixelLingual为您提供高质量的游戏内容翻译。`;
    keywords = `${formattedStudioName} Minecraft翻译, ${formattedStudioName}中文资源包, Minecraft基岩版翻译, ${formattedStudioName}游戏翻译`;
    if (studioInfo.logo) {
      ogImage = studioInfo.logo; // 如果有工作室Logo，使用它
    } else {
      // 如果没有工作室Logo，尝试使用该工作室下第一个翻译包的图片作为Fallback
      const packsForStudio = ALL_PACKS.filter(pack => pack.studio === studioInfo.id);
      if (packsForStudio.length > 0 && packsForStudio[0].image) {
        ogImage = packsForStudio[0].image;
      }
    }
  } else {
    // 如果工作室未找到，根据 slug 格式化名称，并提供通用元数据
    formattedStudioName = studioIdParam.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    description = `您查找的Minecraft工作室“${formattedStudioName}”的翻译包不存在或已被移除。`;
    keywords = `工作室未找到, Minecraft翻译包, ${formattedStudioName}翻译`;
    // ogImage 保持为默认的 "/placeholder.svg"
  }

  return {
    title: `${formattedStudioName} 工作室翻译包 | PixelLingual像素语匠`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: `${formattedStudioName} 工作室翻译包 - PixelLingual`,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200, // 建议的 OG 图片宽度
          height: 630, // 建议的 OG 图片高度
          alt: `${formattedStudioName} Translations`,
        }
      ],
      type: "website", // 对于分类或工作室页面，通常是 website 类型
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedStudioName} 工作室翻译包 - PixelLingual`,
      description: description,
      images: [ogImage],
    },
  };
}

// --------------------------------------------------------
// 2. 页面组件 (服务器组件)
// --------------------------------------------------------
export default async function StudioPage({ params }: PageProps) {
  const { studio: studioIdParam } = params;

  const studioInfo = getStudioById(studioIdParam); // 在服务器端获取工作室信息

  // 如果工作室信息完全不存在，直接在服务器端渲染一个“未找到”页面
  // 这对于搜索引擎和用户体验更好，因为它避免了客户端的二次加载
  if (!studioInfo) {
    const formattedStudioName = studioIdParam.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <div className="container py-20 text-center">
        <h3 className="text-xl font-pixel mb-2">工作室未找到</h3>
        <p className="text-muted-foreground">我们无法找到名为 "{formattedStudioName}" 的工作室。</p>
        <Button asChild className="minecraft-btn mt-4">
          <Link href="/market">返回市场</Link>
        </Button>
      </div>
    );
  }

  // 如果工作室存在，则过滤出该工作室的所有翻译包
  // ALL_PACKS 应该是一个常量数组，可以直接在服务器组件中使用
  const studioPacks = ALL_PACKS.filter((pack) => pack.studio === studioInfo.id);

  // 将获取到的数据作为 props 传递给客户端组件
  return (
    <StudioClient
      initialStudioInfo={studioInfo} // 确保 studioInfo 不为 null
      initialStudioPacks={studioPacks}
      studioIdParam={studioIdParam} // 传递原始参数，尽管在客户端组件中可能不再需要
    />
  );
}