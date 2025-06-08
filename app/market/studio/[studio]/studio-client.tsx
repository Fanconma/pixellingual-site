"use client"; 

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslationPackCard from "@/components/translation-pack-card";
// 导入 Studio 和 TranslationPack 类型
import { Studio, TranslationPack } from "@/data/translation-packs";

interface StudioClientProps {
  initialStudioInfo: Studio; // 这里我们知道 studioInfo 不会是 null，因为服务器组件已处理
  initialStudioPacks: TranslationPack[];
  studioIdParam: string; // 原始的 studio slug，用于在没有 studioInfo 时格式化显示
}

export default function StudioClient({
  initialStudioInfo,
  initialStudioPacks,
  studioIdParam,
}: StudioClientProps) {
  const [visiblePacks, setVisiblePacks] = useState(18);
  // 使用从 props 传入的初始数据初始化状态
  const [studioPacks, setStudioPacks] = useState<TranslationPack[]>(initialStudioPacks);
  const [studioInfo, setStudioInfo] = useState<Studio>(initialStudioInfo); // studioInfo 已经确保不是 null
  const packListRef = useRef<HTMLDivElement>(null);

  // 移除了原始的 useEffect 数据获取逻辑，因为数据现在通过 props 传入

  // 处理无限滚动
  const handleScroll = () => {
    if (!packListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < studioPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 12, studioPacks.length));
    }
  };

  useEffect(() => {
    // 仅在 studioPacks 数组不为空时添加滚动事件监听器
    if (studioPacks.length > 0) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [studioPacks, visiblePacks]);

  // 格式化工作室名称以供显示
  // 在这里，studioInfo 肯定存在，所以可以直接使用 studioInfo.name
  const formattedStudio = studioInfo.name;

  // 注意：服务器组件已经处理了 studioInfo 为 null 的情况
  // 所以这里不再需要检查 !studioInfo，直接渲染页面内容
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${formattedStudio}`}
            alt={`${formattedStudio} translations`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回市场
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            {studioInfo && ( // studioInfo 已经确保不是 null，这个检查可以简化，但保留以防万一
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={studioInfo.logo || "/placeholder.svg"}
                    alt={studioInfo.name}
                    fill
                    className="object-contain pixelated"
                  />
                </div>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{formattedStudio}</span> Translations
            </h1>
            <p className="text-muted-foreground">浏览全部为 {formattedStudio} 地图工作室所创作的翻译包</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {studioPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < studioPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 12, studioPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}

          {studioPacks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-pixel mb-2">这个工作室走丢啦</h3>
              <p className="text-muted-foreground">我们无法找到任何为 "{formattedStudio}" 工作室所创作的翻译包，也许暂无可用翻译包或工作室暂无翻译包？</p>
              <Button asChild className="minecraft-btn mt-4">
                <Link href="/market">返回市场</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}