"use client"; 

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslationPackCard from "@/components/translation-pack-card";
import { TranslationPack } from "@/data/translation-packs"; // 导入 TranslationPack 类型

interface TagClientProps {
  initialTagPacks: TranslationPack[];
  formattedTag: string;
}

export default function TagClient({ initialTagPacks, formattedTag }: TagClientProps) {
  const [visiblePacks, setVisiblePacks] = useState(12);
  // 使用从 props 传入的初始数据初始化状态
  const [tagPacks, setTagPacks] = useState<TranslationPack[]>(initialTagPacks);
  const packListRef = useRef<HTMLDivElement>(null);

  // 移除了原始的 useEffect 数据获取逻辑，因为数据现在通过 props 传入

  // 处理无限滚动
  const handleScroll = () => {
    if (!packListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // 检查是否滚动到距离底部 300px 范围内，并且还有更多包可以加载
    if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < tagPacks.length) {
      setVisiblePacks((prev) => Math.min(prev + 6, tagPacks.length));
    }
  };

  useEffect(() => {
    // 仅在 tagPacks 数组不为空时添加滚动事件监听器
    if (tagPacks.length > 0) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tagPacks, visiblePacks]); // 依赖项确保监听器在状态变化时正确更新

  // 注意：服务器组件已经处理了 tagPacks 为空的情况，
  // 这里的检查是为了客户端侧的极少数边缘情况，或者作为后续交互导致数据变化后的回退。
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

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=400&width=1920&text=${formattedTag} Maps`}
            alt={`${formattedTag} maps`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            回到市场
          </Link>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-pixel tracking-tight">
              <span className="text-primary">{formattedTag}</span> 翻译包
            </h1>
            <p className="text-muted-foreground">浏览我们所有{formattedTag.toLowerCase()}的翻译包</p>
          </div>
        </div>
      </section>

      {/* Translation Packs Grid */}
      <section className="py-8">
        <div className="container">
          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tagPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {visiblePacks < tagPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 6, tagPacks.length))}
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