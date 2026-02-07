"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Star,
  Share2,
  Globe,
  ChevronLeft,
  ChevronRight,
  Download,
  Tag,
  User,
  Building2,
  Clock,
  Package,
  BookOpen,
  ImageIcon,
  Wrench,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisclaimerPopup from "@/components/disclaimer-popup";
import BackToTop from "@/components/back-to-top";
import WalineComments from "@/components/waline-comment";
import { useTheme } from "next-themes";
import {
  getLanguageDisplayName,
  TranslationPack,
} from "@/data/translation-packs";
import TranslationPackCard from "@/components/translation-pack-card";
import StarRating from "@/components/star-rating";
import { STUDIOS } from "@/data/translation-packs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Format date
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "N/A";
  const formattedDateString = dateString.replace(
    /(\d{4})(\d{2})(\d{2})/,
    "$1-$2-$3"
  );
  const date = new Date(formattedDateString);
  if (isNaN(date.getTime())) return "无效日期格式";
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Section header with accent bar
function SectionHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="h-6 w-1 rounded-full bg-primary" />
      <h2 className="text-2xl font-pixel text-foreground">{children}</h2>
    </div>
  );
}

interface TranslationPackDetailClientProps {
  initialPack: TranslationPack;
  initialStudioPacks: TranslationPack[];
  initialSimilarPacks: TranslationPack[];
}

export default function TranslationPackDetailClient({
  initialPack,
  initialStudioPacks,
  initialSimilarPacks,
}: TranslationPackDetailClientProps) {
  const router = useRouter();
  const [pack] = useState<TranslationPack>(initialPack);
  const [studioPacks] = useState<TranslationPack[]>(initialStudioPacks);
  const [similarPacks] = useState<TranslationPack[]>(initialSimilarPacks);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pack.id]);

  const handleDownloadClick = () => {
    const disclaimerAccepted =
      localStorage.getItem("disclaimerAccepted") === "true";
    if (disclaimerAccepted) {
      if (pack) window.open(pack.downloadLink, "_blank");
    } else {
      setIsDisclaimerOpen(true);
    }
  };

  const handleDisclaimerAccept = () => {
    setIsDisclaimerOpen(false);
    if (pack) window.open(pack.downloadLink, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      if (pack) {
        navigator
          .share({
            title: pack.title,
            text: `Check out this Minecraft translation pack: ${pack.title}`,
            url: window.location.href,
          })
          .catch((error) => console.log("Error sharing", error));
      }
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("链接已复制至剪贴板!");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  };

  const nextScreenshot = () => {
    if (pack && pack.screenshots && pack.screenshots.length > 0) {
      setCurrentScreenshot((prev) => (prev + 1) % pack.screenshots.length);
    }
  };

  const prevScreenshot = () => {
    if (pack && pack.screenshots && pack.screenshots.length > 0) {
      setCurrentScreenshot(
        (prev) =>
          (prev - 1 + pack.screenshots.length) % pack.screenshots.length
      );
    }
  };

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const studio = STUDIOS.find((s) => s.id === pack.studio);
  const screenshots = pack.screenshots || [];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-8">
        <div className="container">
          {/* Breadcrumb nav */}
          <nav className="animate-slide-up mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/market"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="font-pixel">市场</span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="truncate font-pixel text-foreground/70 max-w-[200px]">
              {pack.title}
            </span>
          </nav>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            <div
              className="animate-slide-up overflow-hidden rounded-xl border border-border/40 bg-card/70 backdrop-blur-sm"
              style={{ animationDelay: "0.05s" }}
            >
              <div className="relative aspect-video">
                {pack.isDLC && (
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-md bg-purple-600/90 px-3 py-1 font-pixel text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                      DLC
                    </span>
                  </div>
                )}
                {pack.isFeatured && (
                  <div className="absolute right-3 top-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-md bg-yellow-500/90 px-2.5 py-1 font-pixel text-xs font-bold text-yellow-950 shadow-lg backdrop-blur-sm">
                      <Star className="h-3 w-3" />
                      FEATURED
                    </span>
                  </div>
                )}
                <Image
                  src={pack.image || "/placeholder.svg"}
                  alt={pack.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Info Panel */}
            <div className="flex flex-col gap-5">
              {/* Tags */}
              <div
                className="animate-slide-up flex flex-wrap gap-2"
                style={{ animationDelay: "0.1s" }}
              >
                {pack.tags.map((tag) => (
                  <Link href={`/market/tag/${tag.toLowerCase()}`} key={tag}>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 font-pixel text-xs text-primary transition-colors duration-200 hover:bg-primary/20">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Title & Description */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.15s" }}
              >
                <h1 className="font-pixel text-3xl text-foreground text-balance leading-tight">
                  {pack.title}
                </h1>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {pack.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div
                className="animate-slide-up grid grid-cols-2 gap-3"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Rating */}
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/20">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/10">
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">评分</p>
                    <div className="flex items-center gap-1.5">
                      <StarRating rate={pack.rating} />
                      <span className="font-pixel text-sm">
                        {pack.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Updated */}
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/20">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">更新时间</p>
                    <p className="font-pixel text-sm">
                      {formatDate(pack.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/20">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">翻译语言</p>
                    <div className="flex flex-wrap gap-1">
                      {pack.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded bg-muted/80 px-1.5 py-0.5 text-xs"
                        >
                          {getLanguageDisplayName(lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/20">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Package className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">地图价格</p>
                    <span
                      className={cn(
                        "inline-block rounded-md px-2 py-0.5 font-pixel text-sm font-bold",
                        pack.price === 0
                          ? "bg-primary/15 text-primary"
                          : "bg-yellow-500/15 text-yellow-400"
                      )}
                    >
                      {pack.price === 0 ? "FREE" : `${pack.price} MC`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="animate-slide-up flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "0.25s" }}
              >
                <Button
                  className="group flex-1 justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]"
                  onClick={handleDownloadClick}
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  下载翻译包
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-border/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">分享</span>
                </Button>
              </div>

              {/* Metadata */}
              <div
                className="animate-slide-up grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-x-8"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/30">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">翻译作者:</span>
                  <span className="ml-auto font-medium">{pack.author}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/30">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">地图工作室:</span>
                  <Link
                    href={`/market/studio/${pack.studio.toLowerCase().replace(/\s+/g, "-")}`}
                    className="ml-auto font-medium text-primary hover:underline"
                  >
                    {studio ? studio.name : "无名氏"}
                  </Link>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/30">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">发布时间:</span>
                  <span className="ml-auto font-medium">
                    {formatDate(pack.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section
        className="animate-slide-up py-8"
        style={{ animationDelay: "0.35s" }}
      >
        <div className="container">
          <Tabs defaultValue="details">
            <TabsList className="mb-4 grid w-full grid-cols-3 rounded-xl border border-border/40 bg-card/60 p-1 backdrop-blur-sm">
              <TabsTrigger
                value="details"
                className="gap-1.5 rounded-lg font-pixel text-xs transition-all duration-200 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm"
              >
                <BookOpen className="h-3.5 w-3.5" />
                详情
              </TabsTrigger>
              <TabsTrigger
                value="screenshots"
                className="gap-1.5 rounded-lg font-pixel text-xs transition-all duration-200 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                截图
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="gap-1.5 rounded-lg font-pixel text-xs transition-all duration-200 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm"
              >
                <Wrench className="h-3.5 w-3.5" />
                安装
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-6">
              <div className="space-y-8 rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
                {/* Features */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-pixel text-lg text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    包含内容
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    {pack.description}
                  </p>
                  <ul className="space-y-2">
                    {pack.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted/20"
                      >
                        <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Introduction */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-pixel text-lg text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    简介
                  </h3>
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      该汉化包是市场包地图 {pack.title}{" "}
                      的翻译资源包，使用本资源包即可使用中文游玩地图。
                    </p>
                    <p>
                      翻译作者对游戏的各个方面进行了精心翻译，确保保留原意和细微差别，同时使其自然流畅地翻译成中文。我们特别关注游戏特定的术语，并始终保持一致性。如有发现任何翻译错误或不规范，欢迎通过
                      Fanconma@gmail.com 或其他方式提出。
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-pixel text-lg text-foreground">
                    <Globe className="h-5 w-5 text-primary" />
                    翻译语言
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pack.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {getLanguageDisplayName(lang)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots" className="mt-6">
              <div className="rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2 font-pixel text-lg text-foreground">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  截图
                </h3>

                {screenshots.length > 0 ? (
                  <div className="space-y-4">
                    {/* Main screenshot viewer */}
                    <div className="group relative overflow-hidden rounded-xl border border-border/30">
                      <div className="relative aspect-video">
                        <Image
                          src={
                            screenshots[currentScreenshot] ||
                            `/placeholder.svg?height=400&width=600&text=${pack.title} Screenshot`
                          }
                          alt={`Screenshot ${currentScreenshot + 1}`}
                          fill
                          className="object-cover transition-transform duration-500"
                        />
                      </div>

                      {screenshots.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-border/30 bg-background/70 opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-background/90 hover:border-primary/30 group-hover:opacity-100"
                            onClick={prevScreenshot}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-border/30 bg-background/70 opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-background/90 hover:border-primary/30 group-hover:opacity-100"
                            onClick={nextScreenshot}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}

                      <div className="absolute bottom-3 right-3 rounded-lg bg-background/70 px-2.5 py-1 text-xs font-pixel backdrop-blur-md">
                        {currentScreenshot + 1} / {screenshots.length}
                      </div>
                    </div>

                    {/* Thumbnail strip */}
                    {screenshots.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {screenshots.map((screenshot, index) => (
                          <button
                            key={index}
                            title={`查看截图 ${index + 1}`}
                            className={cn(
                              "overflow-hidden rounded-lg border transition-all duration-200",
                              index === currentScreenshot
                                ? "border-primary shadow-[0_0_10px_rgba(93,156,66,0.2)]"
                                : "border-border/30 opacity-60 hover:opacity-100"
                            )}
                            onClick={() => setCurrentScreenshot(index)}
                          >
                            <div className="relative aspect-video">
                              <Image
                                src={
                                  screenshot ||
                                  `/placeholder.svg?height=100&width=150&text=Thumb ${index + 1}`
                                }
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16 text-center">
                    <ImageIcon className="mb-3 h-10 w-10 text-muted-foreground/30" />
                    <p className="font-pixel text-sm text-muted-foreground">
                      暂无截图
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Installation Tab */}
            <TabsContent value="installation" className="mt-6">
              <div className="space-y-6 rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-pixel text-lg text-foreground">
                    <Wrench className="h-5 w-5 text-primary" />
                    翻译包安装说明
                  </h3>
                  <ol className="space-y-3">
                    {[
                      '下载 ".mcpack" 后缀的资源包文件',
                      '"使用 Minecraft 打开"该文件',
                      "进入对应市场地图的创建页面",
                      '点击蓝色背景的"解锁设置"',
                      "进入资源包页面并激活对应的翻译资源包",
                    ].map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/20"
                      >
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 font-pixel text-xs text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Troubleshooting */}
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-pixel text-base">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    故障排除
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    如果您在使用翻译包时遇到任何问题，请尝试以下操作：
                  </p>
                  <ul className="space-y-2">
                    {[
                      "手机用户在蓝奏云下载时要点开汉化包文件详情页才可直接下载",
                      "确保你使用的 Minecraft 版本兼容地图",
                      "确保你的语言是汉化包所对应的语言而不是其他语言（例如汉化包不支持繁体中文而你正在使用繁体中文）",
                      "尝试将汉化资源包放于所有资源包的顶端",
                    ].map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" />
                        <span className="leading-relaxed text-muted-foreground">
                          {tip}
                        </span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" />
                      <span className="leading-relaxed text-muted-foreground">
                        浏览我们的{" "}
                        <Link
                          href="/troubleshooting"
                          className="text-primary hover:underline"
                        >
                          故障排除界面
                        </Link>{" "}
                        获取更多帮助
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Download Button */}
                <Button
                  className="group w-full justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-pixel text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(93,156,66,0.3)]"
                  onClick={handleDownloadClick}
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  下载翻译包
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Studio Packs */}
      {studioPacks.length > 0 && (
        <section
          className="animate-slide-up py-8"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="container">
            <SectionHeader>
              更多来自 {studio ? studio.name : "无名氏"} 的地图翻译包
            </SectionHeader>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {studioPacks.map((studioPack) => (
                <TranslationPackCard key={studioPack.id} pack={studioPack} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Packs */}
      {similarPacks.length > 0 && (
        <section
          className="animate-slide-up py-8"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="container">
            <SectionHeader>类似地图的汉化包</SectionHeader>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarPacks.map((similarPack) => (
                <TranslationPackCard
                  key={similarPack.id}
                  pack={similarPack}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments */}
      <section
        className="animate-slide-up py-8"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="container">
          <SectionHeader>评论</SectionHeader>
          {mounted && (
            <div className="rounded-xl border border-border/40 bg-card/60 p-6 backdrop-blur-sm">
              <WalineComments
                serverURL="https://comment.pling.top/"
                path={pack.id}
                dark={resolvedTheme === "dark"}
                lang="zh-CN"
              />
            </div>
          )}
        </div>
      </section>

      <DisclaimerPopup
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onAccept={handleDisclaimerAccept}
        packTitle={pack.title}
      />

      <BackToTop />
    </div>
  );
}
