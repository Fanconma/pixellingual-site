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
  ALL_PACKS,
  FEATURED_PACKS,
  TAGS,
  STUDIOS,
  SECTIONS,
  TranslationPack,
  Studio,
  Section,
  getPacksBySectionId, // 👈 新增导入
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
  const [isSearching, setIsSearching] = useState(initialIsSearching);
  const packListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  useEffect(() => {
    setSelectedTag(currentSelectedTagFromUrl);
  }, [currentSelectedTagFromUrl]);

  const filteredPacks = useMemo(() => {
    let currentPacks = ALL_PACKS;

    if (selectedTag) {
      currentPacks = currentPacks.filter((pack) => pack.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase()));
    }

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
  }, [selectedTag, searchQuery]);

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
          // 修正：使用 getPacksBySectionId 函数来获取该 section 的包
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
      <section className="py-8 animate-fade-in animate-delay-800">
        <div className="container">
          <h2 className="text-2xl font-pixel mb-6">
            {isSearching ? `"${searchQuery}" 的搜索结果` : "全部翻译包"}
          </h2>

          <div ref={packListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPacks.slice(0, visiblePacks).map((pack) => (
              <TranslationPackCard key={pack.id} pack={pack} />
            ))}
          </div>

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

          {filteredPacks.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-pixel mb-2">未找到翻译包</h3>
              <p className="text-muted-foreground">尝试调整您的过滤条件或搜索词</p>
              <Button asChild className="minecraft-btn mt-4">
                <Link href="/market">清除筛选器</Link>
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