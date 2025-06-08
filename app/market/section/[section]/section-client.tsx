// components/section-client.tsx
"use client"; // 👈 标记为客户端组件

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Image 组件通常在客户端使用，但这里用它作为背景图，所以保持
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslationPackCard from "@/components/translation-pack-card";
// 注意：这里不再需要 getPacksBySectionId, getSectionTitleById
import { TranslationPack } from "@/data/translation-packs"; // 导入 TranslationPack 类型

interface SectionClientProps {
  initialSectionPacks: TranslationPack[];
  initialSectionTitle: string;
  sectionId: string; // 传入 sectionId 以便在客户端组件中使用，如果需要
}

export default function SectionClient({
  initialSectionPacks,
  initialSectionTitle,
  sectionId, // 接收 sectionId
}: SectionClientProps) {
  // 使用从 props 传入的初始数据初始化状态
  const [visiblePacks, setVisiblePacks] = useState(18);
  const [sectionPacks, setSectionPacks] = useState<TranslationPack[]>(initialSectionPacks);
  const [sectionTitle, setSectionTitle] = useState(initialSectionTitle);
  const packListRef = useRef<HTMLDivElement>(null);

  // 移除了原始的 useEffect 数据获取逻辑，因为数据现在通过 props 传入

  // 处理无限滚动
  const handleScroll = () => {
    if (!packListRef.current) return;

    // 确保只有在用户滚动到底部附近且还有更多包可以加载时才加载
    // document.documentElement 适用于整个文档的滚动
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < sectionPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 12, sectionPacks.length));
    }
  };

  useEffect(() => {
    // 仅在 sectionPacks 数组不为空时添加滚动事件监听器，避免不必要的监听
    if (sectionPacks.length > 0) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionPacks, visiblePacks]); // 依赖项包含 sectionPacks 和 visiblePacks

  // 如果 sectionPacks 为空，显示未找到内容
  if (sectionPacks.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
        <p className="text-muted-foreground">
          我们无法在 "{sectionTitle}" 部分找到任何翻译包。
        </p>
        <Button asChild className="minecraft-btn mt-4">
          <Link href="/market">返回市场</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${sectionTitle}`}
            alt={`${sectionTitle} translations`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Market
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{sectionTitle}</span>
            </h1>
            <p className="text-muted-foreground">浏览本部分中的所有翻译</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sectionPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < sectionPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 12, sectionPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}