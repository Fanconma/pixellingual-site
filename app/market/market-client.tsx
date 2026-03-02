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
import { Filter, DoorOpen, ChevronRight } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

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

// 仅导入类型，不导入实际数据
import {
  TranslationPack,
  STUDIOS,
  SECTIONS,
  getPacksBySectionId, 
  getPackStatus, 
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

// 更新 MarketClientProps 接口，以反映数据现在通过 props 传递，
// 并且 sections 现在包含 packs 数组。
interface MarketClientProps {
  initialFilteredPacks: TranslationPack[];
  initialSelectedTag: string | null;
  initialSearchQuery: string;
  initialIsSearching: boolean;
  recentPacks: TranslationPack[];
  featuredPacks: TranslationPack[];
  tags: string[]; // 从服务器端传递
  studios: Studio[]; // 从服务器端传递
  sections: (Section & { packs: TranslationPack[] })[]; // 从服务器端传递，已预处理 packs
}

export default function MarketClient({
  initialFilteredPacks,
  initialSelectedTag,
  initialSearchQuery,
  initialIsSearching,
  recentPacks,
  featuredPacks,
  tags,    // 现在是 props
  studios, // 现在是 props
  sections, // 现在是 props，已包含 packs
}: MarketClientProps) {
  const searchParams = useSearchParams();
  const currentSelectedTagFromUrl = searchParams.get("tag");

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTag, setSelectedTag] = useState(initialSelectedTag);
  const INITIAL_VISIBLE_PACKS = useMemo(() => {
    return typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 12;
  }, []);
  const [visiblePacks, setVisiblePacks] = useState(INITIAL_VISIBLE_PACKS);
  const [isSearching, setIsSearching] = useState(initialIsSearching);
  const packListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  // ---------- 懒加载相关的状态和 ref ----------
  const [clientLoadedAllPacks, setClientLoadedAllPacks] = useState<TranslationPack[]>([]);
  const [isLoadingClientAllPacks, setIsLoadingClientAllPacks] = useState(false);
  const allPacksSectionRef = useRef<HTMLDivElement>(null);
  // ---------------------------------------------

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  // Track which slide index is active for center-highlight styling
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // 根据 URL 中的 'tag' 参数更新 selectedTag 状态
  useEffect(() => {
    setSelectedTag(currentSelectedTagFromUrl);
  }, [currentSelectedTagFromUrl]);


  // ---------- Intersection Observer 用于懒加载 "全部翻译包" ----------
  useEffect(() => {
    if (
      allPacksSectionRef.current &&
      !initialIsSearching &&
      !initialSelectedTag &&
      clientLoadedAllPacks.length === 0 &&
      !isLoadingClientAllPacks
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => { // 注意这里添加了 async
            if (entry.isIntersecting) {
              setIsLoadingClientAllPacks(true);
              try {
                // *** 核心修改：从 API 路由获取 ALL_PACKS 数据 ***
                const res = await fetch('/api/packs');
                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: TranslationPack[] = await res.json();
                setClientLoadedAllPacks(data); // 加载 ALL_PACKS 数据
              } catch (error) {
                console.error("Error fetching ALL_PACKS:", error);
                // 可以添加用户友好��错误消息
              } finally {
                setIsLoadingClientAllPacks(false);
              }
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
      return initialFilteredPacks;
    } else if (clientLoadedAllPacks.length > 0) {
      return clientLoadedAllPacks;
    }
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
    setIsSearching(!!searchQuery);
    setVisiblePacks(INITIAL_VISIBLE_PACKS);
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
      <section className="relative py-8 sm:py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/market.jpeg"
            alt="Minecraft marketplace"
            fill
            className="object-cover opacity-20"
            priority
            quality={45}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel tracking-tight animate-fade-in">
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
        <section className="py-12 bg-muted/30 backdrop-blur-sm animate-fade-in animate-delay-300">
          <div className="container">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1 rounded-full bg-primary" />
              <h2 className="text-xl md:text-2xl font-pixel">推荐汉化包</h2>
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>

            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="flex">
                {featuredPacks.map((pack, index) => {
                  const studio = STUDIOS.find((s) => s.id === pack.studio);
                  const studioName = studio ? studio.name : "未知工作室";
                  const { isNew, isUpdated } = getPackStatus(pack);
                  const isActive = index === selectedIndex;

                  return (
                    <div
                      key={pack.id}
                      className={cn(
                        "flex-[0_0_92%] min-w-0 px-1.5 sm:flex-[0_0_85%] sm:px-2 md:flex-[0_0_55%] lg:flex-[0_0_50%]",
                        "transition-all duration-500 ease-out motion-reduce:transition-none",
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-[0.95] sm:scale-[0.92] opacity-50 sm:opacity-60",
                      )}
                    >
                      <Link href={`/market/${pack.id}`} className="block group">
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-xl",
                            "aspect-[16/10] sm:aspect-video",
                            "transition-all duration-500 ease-out motion-reduce:transition-none",
                            "border border-transparent",
                            isActive
                              ? "shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-primary/20"
                              : "shadow-md",
                            "group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)]",
                          )}
                        >
                          <Image
                            src={pack.image || "/placeholder.svg"}
                            alt={pack.title}
                            fill
                            className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
                            loading="lazy"
                            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 55vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* DLC badge with hover glow */}
                          {pack.isDLC && (
                            <div
                              className={cn(
                                "absolute top-2 left-2 sm:top-3 sm:left-3 z-20 font-pixel text-[10px] sm:text-xs font-bold",
                                "px-2 py-1 sm:px-3 sm:py-1.5 rounded-md backdrop-blur-sm",
                                "bg-purple-600/90 text-white",
                                "shadow-lg shadow-purple-900/30",
                                "transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:animate-none",
                                "animate-dlc-glow",
                                "group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7),_0_0_40px_rgba(147,51,234,0.3)]",
                                "group-hover:bg-purple-500/95 group-hover:scale-110",
                              )}
                            >
                              DLC
                            </div>
                          )}

                          {/* New / Updated badges */}
                          {isNew ? (
                            <div
                              className={cn(
                                "absolute top-2 right-2 sm:top-3 sm:right-3 z-20 font-pixel text-[10px] sm:text-xs font-bold",
                                "px-2 py-1 sm:px-3 sm:py-1.5 rounded-md backdrop-blur-sm",
                                "bg-red-500/90 text-white shadow-lg shadow-red-900/30",
                                "transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110",
                              )}
                            >
                              NEW
                            </div>
                          ) : (
                            isUpdated && (
                              <div
                                className={cn(
                                  "absolute top-2 right-2 sm:top-3 sm:right-3 z-20 font-pixel text-[10px] sm:text-xs font-bold",
                                  "px-2 py-1 sm:px-3 sm:py-1.5 rounded-md backdrop-blur-sm",
                                  "bg-blue-500/90 text-white shadow-lg shadow-blue-900/30",
                                )}
                              >
                                UPD
                              </div>
                            )
                          )}

                          {/* Bottom info overlay */}
                          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5">
                            <h3 className="font-pixel text-sm sm:text-lg md:text-xl text-white mb-1 sm:mb-1.5 line-clamp-1">{pack.title}</h3>
                            <p className="hidden sm:block text-sm text-white/70 line-clamp-2 mb-2">{pack.description}</p>
                            <div className="flex items-center gap-3 sm:gap-4">
                              <span className="text-[10px] sm:text-xs text-white/50 truncate max-w-[120px]">{studioName}</span>
                              <span
                                className={cn(
                                  "font-pixel text-[10px] sm:text-xs font-bold rounded-md px-1.5 sm:px-2 py-0.5",
                                  pack.price === 0
                                    ? "bg-primary/20 text-primary"
                                    : "bg-yellow-500/20 text-yellow-400",
                                )}
                              >
                                {pack.price === 0 ? "FREE" : `${pack.price} MC`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel dot indicators */}
            <div className="flex justify-center gap-2 mt-4 sm:mt-5">
              {featuredPacks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-2 sm:h-1.5 rounded-full transition-all duration-300",
                    index === selectedIndex
                      ? "w-8 bg-primary"
                      : "w-2 sm:w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags Section - Only show when not searching */}
      {!isSearching && (
        <section className="py-8 animate-fade-in animate-delay-400">
          <div className="container">
            {/* 统一标题大小，并添加箭头 */}
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="text-xl md:text-2xl font-pixel flex items-center"> {/* <-- 标题大小调整 */}
                按标签浏览 <ChevronRight className="ml-2 h-6 w-6 text-primary" />
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {tags.map((tag) => ( // 使用 props.tags
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
            {/* 统一标题大小，并添加箭头 */}
            <div className="flex items-center mb-4">
              <DoorOpen className="h-5 w-5 mr-2" />
              <h2 className="text-xl md:text-2xl font-pixel flex items-center"> {/* <-- 标题大小调整 */}
                按工作室浏览 <ChevronRight className="ml-2 h-6 w-6 text-primary" />
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
              {studios.map((studio) => ( // 使用 props.studios
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections based on data - HorizontalScrollSection 自身已处理标题和箭头 */}
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
                  {section.packs.slice(0, 10).map((pack) => (
                    <div key={pack.id} className="w-44 sm:w-64 md:w-72 lg:w-80">
                      <TranslationPackCard pack={pack} />
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
              {/* 统一标题大小，并添加箭头 */}
              <h2 className="text-xl md:text-2xl font-pixel flex items-center"> {/* <-- 标题大小调整 */}
                最新翻译 <ChevronRight className="ml-2 h-6 w-6 text-primary" />
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
          {/* 统一标题大小，并添加箭头 */}
          <h2 className="text-xl md:text-2xl font-pixel mb-6 flex items-center"> {/* <-- 标题大小调整 */}
            {isSearching ? `"${searchQuery}" 的搜索结果` : "全部翻译包"} <ChevronRight className="ml-2 h-6 w-6 text-primary" />
          </h2>

          {/* 根据加载状态和是否存在搜索/标签，显示骨架屏或实际内容 */}
          {isLoadingClientAllPacks && !isSearching && !selectedTag ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {[...Array(INITIAL_VISIBLE_PACKS)].map((_, i) => (
                <div key={i} className="rounded-lg sm:rounded-xl bg-card/50 animate-shimmer h-48 sm:h-64"></div>
              ))}
            </div>
          ) : (
            <>
              {filteredPacks.length > 0 ? (
                <div ref={packListRef} className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                  {filteredPacks.slice(0, visiblePacks).map((pack) => (
                    <TranslationPackCard key={pack.id} pack={pack} />
                  ))}
                </div>
              ) : (
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
                className="minecraft-btn px-8 py-4 text-lg"
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
