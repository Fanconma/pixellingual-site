// app/market/market-client.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";
import BackToTop from "@/components/back-to-top";
import { throttle, debounce } from "@/lib/performance";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Filter, DoorOpen } from "lucide-react";

// Dynamically import heavy components (keep these in the client component)
const TranslationPackCard = dynamic(() => import("@/components/translation-pack-card"), {
  ssr: false,
  loading: () => <div className="minecraft-card animate-pulse h-64"></div>,
});

const TagCard = dynamic(() => import("@/components/tag-card"), {
  ssr: false,
  loading: () => <div className="minecraft-card animate-pulse h-12"></div>,
});

const StudioCard = dynamic(() => import("@/components/studio-card"), {
  ssr: false,
  loading: () => <div className="minecraft-card animate-pulse h-24"></div>,
});

const HorizontalScrollSection = dynamic(() => import("@/components/horizontal-scroll-section"), {
  ssr: false,
});

// 导入数据源中的类型和常量，以及 getPacksBySectionId 函数
import {
  ALL_PACKS, // 确保 ALL_PACKS 在客户端可用，用于懒加载
  FEATURED_PACKS,
  TAGS,
  STUDIOS,
  SECTIONS,
  TranslationPack,
  Studio,
  Section,
  getPacksBySectionId,
} from "@/data/translation-packs";

// Helper function for date formatting (from previous steps)
const formatDateString = (dateString: string | undefined | null) => {
  if (!dateString) {
    return "N/A";
  }
  const formattedDateString = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  const date = new Date(formattedDateString);
  if (isNaN(date.getTime())) {
    return "无效日期格式";
  }
  return date;
};


interface MarketClientProps {
  // initialFilteredPacks 现在可能是服务器端过滤后的结果，或者在没有初始查询/标签时为空数组
  initialFilteredPacks: TranslationPack[];
  initialSelectedTag: string | null;
  initialSearchQuery: string;
  initialIsSearching: boolean;
  recentPacks: TranslationPack[];
  featuredPacks: TranslationPack[];
  tags: string[];
  studios: Studio[];
  sections: Section[];
}

export default function MarketClient({
  initialFilteredPacks,
  initialSelectedTag,
  initialSearchQuery,
  initialIsSearching,
  recentPacks,
  featuredPacks,
  tags,
  studios,
  sections,
}: MarketClientProps) {
  const searchParams = useSearchParams();
  const currentSelectedTagFromUrl = searchParams.get("tag");

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTag, setSelectedTag] = useState(initialSelectedTag);
  const INITIAL_VISIBLE_PACKS = useMemo(() => {
    return typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 12;
  }, []);
  const [visiblePacks, setVisiblePacks] = useState(INITIAL_VISIBLE_PACKS);
  const [isSearching, setIsSearching] = useState(initialIsSearching); // 客户端的搜索状态
  const packListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  // ---------- 新增懒加载相关的状态和 ref ----------
  const [clientLoadedAllPacks, setClientLoadedAllPacks] = useState<TranslationPack[]>([]);
  const [isLoadingClientAllPacks, setIsLoadingClientAllPacks] = useState(false);
  const allPacksSectionRef = useRef<HTMLDivElement>(null);
  // ---------------------------------------------

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  // 根据 URL 中的 'tag' 参数更新 selectedTag 状态
  useEffect(() => {
    setSelectedTag(currentSelectedTagFromUrl);
  }, [currentSelectedTagFromUrl]);


  // ---------- Intersection Observer 用于懒加载 "全部翻译包" ----------
  useEffect(() => {
    // 仅当满足以下条件时触发懒加载：
    // 1. 元素存在于 DOM 中
    // 2. 页面没有初始搜索查询 (initialIsSearching 为 false)
    // 3. 页面没有初始标签筛选 (initialSelectedTag 为 null)
    // 4. 客户端尚未加载 ALL_PACKS 数据 (clientLoadedAllPacks 为空)
    // 5. 当前没有正在加载 ALL_PACKS
    if (
      allPacksSectionRef.current &&
      !initialIsSearching &&
      !initialSelectedTag &&
      clientLoadedAllPacks.length === 0 &&
      !isLoadingClientAllPacks
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsLoadingClientAllPacks(true);
              // 模拟数据加载延迟，实际应用中这里会是 fetch('/api/all-packs')
              setTimeout(() => {
                setClientLoadedAllPacks(ALL_PACKS); // 加载 ALL_PACKS 数据
                setIsLoadingClientAllPacks(false);
              }, 800); // 模拟 800ms 的网络延迟
              observer.unobserve(entry.target); // 一旦加载，停止观察，避免重复触发
            }
          });
        },
        {
          root: null, // 视口作为根
          rootMargin: '200px', // 在元素进入视口前 200px 开始加载
          threshold: 0.1, // 元素 10% 可见时触发
        }
      );

      observer.observe(allPacksSectionRef.current);

      // 清理函数：组件卸载或依赖项改变时停止观察
      return () => {
        if (allPacksSectionRef.current) {
          observer.unobserve(allPacksSectionRef.current);
        }
      };
    }
  }, [initialIsSearching, initialSelectedTag, clientLoadedAllPacks, isLoadingClientAllPacks]); // 依赖项

  // -----------------------------------------------------------------


  // 根据当前状态，选择基础数据源
  const basePacks = useMemo(() => {
    if (initialIsSearching || initialSelectedTag) {
      // 如果 URL 中有初始搜索查询或标签，则使用服务器端提供的过滤结果
      return initialFilteredPacks;
    } else if (clientLoadedAllPacks.length > 0) {
      // 如果客户端已懒加载 ALL_PACKS，则使用这些数据
      return clientLoadedAllPacks;
    }
    // 默认情况：在客户端 ALL_PACKS 加载完成之前，返回空数组
    // 此时，UI 会显示加载骨架屏
    return [];
  }, [initialFilteredPacks, initialIsSearching, initialSelectedTag, clientLoadedAllPacks]);


  // 综合过滤逻辑 (应用客户端搜索和标签过滤)
  const filteredPacks = useMemo(() => {
    let currentPacks = basePacks;

    // 应用客户端标签过滤
    if (selectedTag) {
      currentPacks = currentPacks.filter((pack) => pack.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase()));
    }

    // 应用客户端搜索查询过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      currentPacks = currentPacks.filter(
        (pack) =>
          pack.title.toLowerCase().includes(query) ||
          pack.description.toLowerCase().includes(query) ||
          pack.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          pack.author.toLowerCase().includes(query) ||
          pack.studio.toLowerCase().includes(query),
      );
    }
    return currentPacks;
  }, [basePacks, selectedTag, searchQuery]);


  // 当搜索查询或标签改变时，更新搜索状态和可见包数量
  useEffect(() => {
    setIsSearching(!!searchQuery); // 更新 isSearching 状态，控制其他部分的显示
    setVisiblePacks(INITIAL_VISIBLE_PACKS); // 重置可见包数量
  }, [searchQuery, selectedTag, INITIAL_VISIBLE_PACKS]);

  const handleScroll = useCallback(
    throttle(() => {
      if (!packListRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300 && visiblePacks < filteredPacks.length) {
        setVisiblePacks((prev) => Math.min(prev + 6, filteredPacks.length));
      }
    }, 500),
    [filteredPacks, visiblePacks],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    [],
  );

  const scrollToSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.scrollIntoView({ behavior: "smooth" });
      const inputElement = searchInputRef.current.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/market.jpeg"
            alt="Minecraft marketplace"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel tracking-tight animate-fade-in">
              MARKETPLACE<br /> <span className="text-primary">TRANSLATION</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">
              浏览我们精选的 Minecraft 英译中翻译包。所有翻译包均可免费下载。
            </p>

            {/* Search Bar */}
            <div ref={searchInputRef} className="max-w-md mx-auto mt-6 animate-fade-in animate-delay-200">
              <SearchBar onSearch={handleSearch} initialQuery={initialSearchQuery}/>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel - Only show when not searching */}
      {!isSearching && (
        <section className="py-12 bg-gray-900/50 animate-fade-in animate-delay-300">
          <div className="container">
            <h2 className="text-2xl font-pixel mb-6">推荐汉化包</h2>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {featuredPacks.map((pack) => {
                  if (pack.isFeatured) {
                    const studio = STUDIOS.find((studio) => studio.id === pack.studio);
                    return (
                      <div key={pack.id} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_50%]">
                        <Link href={`/market/${pack.id}`} className="block">
                          <div className="relative aspect-video overflow-hidden rounded-lg group">
                            <Image
                              src={pack.image || "/placeholder.svg"}
                              alt={pack.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6">
                              <h3 className="font-pixel text-xl text-white mb-2">{pack.title}</h3>
                              <p className="text-sm text-gray-300 line-clamp-2">{pack.description}</p>
                              <div className="flex items-center mt-2">
                                <span className="text-xs text-gray-400 mr-4">{studio ? studio.name : "无名氏"}</span>
                                <span className="text-xs text-primary flex items-center">
                                  <span className="mr-1">价格:</span>
                                  {pack.price === 0 ? "免费" : `${pack.price} MC`}
                                </span>
                              </div>
                            </div>

                            {/* New/Updated Tag - using formatDateString helper */}
                            {(() => {
                              const currentDate = new Date();
                              const createdDate = formatDateString(pack.createdAt);
                              const updatedDate = formatDateString(pack.updatedAt);

                              const isNew = createdDate && (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24) <= 7;
                              const isUpdated = !isNew && updatedDate && (currentDate.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24) <= 7;

                              if (isNew) {
                                return (
                                  <div className="absolute top-4 right-4">
                                    <span className="tag-pill">New</span>
                                  </div>
                                );
                              } else if (isUpdated) {
                                return (
                                  <div className="absolute top-4 right-4">
                                    <span className="tag-pill bg-blue-600">Updated</span>
                                  </div>
                                );
                              }
                              return null;
                            })()}

                            {pack.isDLC && (
                              <div className="absolute top-4 left-4">
                                <span className="bg-yellow-500 text-black font-pixel px-3 py-1">DLC</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tags Section - Only show when not searching */}
      {!isSearching && (
        <section className="py-8 animate-fade-in animate-delay-400">
          <div className="container">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-pixel">按标签浏览</h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {tags.map((tag) => (
                <TagCard key={tag} tag={tag} isSelected={selectedTag?.toLowerCase() === tag.toLowerCase()} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Studios Section - Only show when not searching */}
      {!isSearching && (
        <section className="py-8 animate-fade-in animate-delay-500">
          <div className="container">
            <div className="flex items-center mb-4">
              <DoorOpen className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-pixel">按工作室浏览</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {studios.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections based on data - Only show when not searching */}
      {!isSearching &&
        sections.map((section) => {
          const sectionPacks = getPacksBySectionId(section.id);

          if (sectionPacks.length === 0) return null;

          return (
            <section key={section.id} className="py-8 animate-fade-in animate-delay-600">
              <div className="container">
                <HorizontalScrollSection
                  title={section.title}
                  description={section.description}
                  viewAllHref={`/market/section/${section.id}`}
                >
                  {sectionPacks.slice(0, 10).map((pack) => (
                    <div key={pack.id} className="w-80">
                      <TranslationPackCard pack={pack} size="large" />
                    </div>
                  ))}
                </HorizontalScrollSection>
              </div>
            </section>
          );
        })}

      {/* Recent Translations Section - Only show when not searching */}
      {!isSearching && (
        <section className="py-8 animate-fade-in animate-delay-700">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-pixel">最新翻译</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPacks.map((pack) => (
                <TranslationPackCard key={pack.id} pack={pack} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Translation Packs or Search Results */}
      {/* 使用 allPacksSectionRef 观察此 section */}
      <section className="py-8 animate-fade-in animate-delay-800" ref={allPacksSectionRef}>
        <div className="container">
          <h2 className="text-2xl font-pixel mb-6">
            {isSearching ? `"${searchQuery}" 的搜索结果` : "全部翻译包"}
          </h2>

          {/* 根据加载状态和是否存在搜索/标签，显示骨架屏或实际内容 */}
          {isLoadingClientAllPacks && !isSearching && !selectedTag ? (
            // 只有当客户端正在加载 ALL_PACKS 且没有处于搜索/标签过滤状态时显示骨架屏
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(INITIAL_VISIBLE_PACKS)].map((_, i) => (
                <div key={i} className="minecraft-card animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            // 否则，渲染实际的翻译包列表或“未找到”消息
            <>
              {filteredPacks.length > 0 ? (
                <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredPacks.slice(0, visiblePacks).map((pack) => (
                    <TranslationPackCard key={pack.id} pack={pack} />
                  ))}
                </div>
              ) : (
                // 未找到翻译包
                <div className="text-center py-12">
                  <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
                  <p className="text-muted-foreground">尝试调整您的过滤条件或搜索词</p>
                  <Button asChild className="minecraft-btn mt-4">
                    <Link href="/market">清除筛选器</Link>
                  </Button>
                </div>
              )}
            </>
          )}


          {/* 加载更多按钮 */}
          {visiblePacks < filteredPacks.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setVisiblePacks((prev) => Math.min(prev + 6, filteredPacks.length))}
                className="minecraft-btn"
              >
                加载更多
              </Button>
            </div>
          )}

        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}