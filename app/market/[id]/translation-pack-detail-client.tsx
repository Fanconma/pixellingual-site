"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Star, Share2, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisclaimerPopup from "@/components/disclaimer-popup";
import BackToTop from "@/components/back-to-top";
import WalineComments from '@/components/waline-comment';
import { useTheme } from "next-themes";
import {
  getLanguageDisplayName,
  TranslationPack, // 导入类型
} from "@/data/translation-packs";
import TranslationPackCard from "@/components/translation-pack-card";
import StarRating from "@/components/star-rating";
import { STUDIOS } from "@/data/translation-packs";
import { useRouter } from "next/navigation";

// 格式化日期函数
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) {
    return "N/A"; // 如果日期字符串为空或 null/undefined，返回 "N/A"
  }

  // 假设 dateString 是 "YYYYMMDD" 格式，例如 "20220217"
  // 将其转换为 "YYYY-MM-DD" 格式，例如 "2022-02-17"
  // 使用正则表达式匹配年、月、日，并用破折号连接
  const formattedDateString = dateString.replace(
    /(\d{4})(\d{2})(\d{2})/,
    '$1-$2-$3'
  );

  const date = new Date(formattedDateString);

  // 检查日期对象是否有效 (getTime() 返回 NaN 表示无效日期)
  if (isNaN(date.getTime())) {
    return "无效日期格式"; // 如果仍然无法解析，返回一个友好的错误提示
  }

  // 使用 toLocaleDateString 进行格式化
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
};

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
  // 使用从 props 传入的初始数据初始化状态
  const [pack, setPack] = useState<TranslationPack>(initialPack);
  const [studioPacks, setStudioPacks] = useState<TranslationPack[]>(initialStudioPacks);
  const [similarPacks, setSimilarPacks] = useState<TranslationPack[]>(initialSimilarPacks);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // 滚动到顶部（对于客户端路由跳转时仍有用）
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pack.id]); // 依赖 pack.id 确保在从详情页A跳转到详情页B时也会滚动

  // 移除了原始的 useEffect 数据获取逻辑，因为数据现在通过 props 传入

  const handleDownloadClick = () => {
    const disclaimerAccepted = localStorage.getItem("disclaimerAccepted") === "true";

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
      setCurrentScreenshot((prev) => (prev - 1 + pack.screenshots.length) % pack.screenshots.length);
    }
  };
  // 使用 useTheme 获取主题相关信息
  const {resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  })
  // 计算星级显示，这部分是纯展示逻辑，可以直接放在渲染中
  const studio = STUDIOS.find((s) => s.id === pack.studio);
  const screenshots = pack.screenshots || [];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-8 animate-fade-in">
        <div className="container">
          <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            回到市场
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="minecraft-card overflow-hidden">
              {pack.isDLC && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-yellow-500 text-black font-pixel px-3 py-1">DLC</span>
                </div>
              )}
              <Image
                src={pack.image || "/placeholder.svg"}
                alt={pack.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {pack.tags.map((tag) => (
                    <Link href={`/market/tag/${tag.toLowerCase()}`} key={tag}>
                      <span className="tag-pill">{tag}</span>
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl font-pixel">{pack.title}</h1>
                <p className="text-muted-foreground mt-2">{pack.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="minecraft-card p-3">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-sm">评分</span>
                  </div>
                  <div className="flex items-center">
                    <StarRating rate={pack.rating} />
                    <span className="ml-2 font-pixel text-lg">{pack.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="minecraft-card p-3">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">更新时间</span>
                  </div>
                  <p className="font-pixel text-lg">{formatDate(pack.updatedAt)}</p>
                </div>

                <div className="minecraft-card p-3">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="text-sm">翻译语言</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pack.languages.map((lang) => (
                      <span key={lang} className="text-xs px-2 py-1 rounded">
                        {getLanguageDisplayName(lang)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="minecraft-card p-3">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <span className="text-sm">地图价格</span>
                  </div>
                  <p className="font-pixel text-lg">{pack.price === 0 ? "免费" : `${pack.price} MC`}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="minecraft-btn flex-1 justify-center" onClick={handleDownloadClick}>
                  下载翻译包
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">分享</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">翻译作者:</span>
                  <span>{pack.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">地图工作室:</span>
                  <Link
                    href={`/market/studio/${pack.studio.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-primary"
                  >
                    {studio ? studio.name : "无名氏"}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发布时间:</span>
                  <span>{formatDate(pack.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

      {/* Content Tabs */}
      <section className="py-8 animate-fade-in animate-delay-100">
        <div className="container">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger value="details" className="font-pixel text-xs sm:text-sm">
                详情
              </TabsTrigger>
              <TabsTrigger value="screenshots" className="font-pixel text-xs sm:text-sm">
                截图
              </TabsTrigger>
              <TabsTrigger value="installation" className="font-pixel text-xs sm:text-sm">
                安装
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="minecraft-card p-6">
                <h2 className="text-xl font-pixel mb-4">包含内容</h2>
                <p>{pack.description}</p>
                <ul className="space-y-2">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-pixel mt-8 mb-4">简介</h2>
                <div className="space-y-4">
                  <p>
                    该汉化包是市场包地图 {pack.title} 的翻译资源包，使用本资源包即可使用中文游玩地图。
                  </p>
                  <p>
                    翻译作者对游戏的各个方面进行了精心翻译，确保保留原意和细微差别，同时使其自然流畅地翻译成中文。我们特别关注游戏特定的术语，并始终保持一致性。如有发现任何翻译错误或不规范，欢迎通过 Fanconma@gmail.com 或其他方式提出。
                  </p>
                </div>

                <h2 className="text-xl font-pixel mt-8 mb-4">翻译语言</h2>
                <div className="space-y-2">
                  {pack.languages.map((lang) => (
                    <div key={lang} className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      <span>{getLanguageDisplayName(lang)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="screenshots" className="mt-6">
              <div className="minecraft-card p-6">
                <h2 className="text-xl font-pixel mb-4">截图</h2>
                
                {screenshots.length > 0 ? (
                  <div className="space-y-6">
                    {/* 主要截图展示 */}
                    <div className="relative minecraft-card overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={screenshots[currentScreenshot] || `/placeholder.svg?height=400&width=600&text=${pack.title} Screenshot`}
                          alt={`Screenshot ${currentScreenshot + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* 导航按钮 */}
                      {screenshots.length > 1 && (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full"
                            onClick={prevScreenshot}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">前一张截图</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full"
                            onClick={nextScreenshot}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">下一张截图</span>
                          </Button>
                        </>
                      )}
                      
                      {/* 截图计数器 */}
                      <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        {currentScreenshot + 1} / {screenshots.length}
                      </div>
                    </div>
                    
                    {/* 缩略图导航 */}
                    {screenshots.length > 1 && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {screenshots.map((screenshot, index) => (
                          <button
                            key={index}
                            title="继续"
                            className={`minecraft-card overflow-hidden ${index === currentScreenshot ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setCurrentScreenshot(index)}
                          >
                            <div className="aspect-video relative">
                              <Image
                                src={screenshot || `/placeholder.svg?height=100&width=150&text=Thumb ${index + 1}`}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="minecraft-card overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=${pack.title} Screenshot ${index}`}
                          alt={`Screenshot ${index}`}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="installation" className="mt-6">
              <div className="minecraft-card p-6">
                <h2 className="text-xl font-pixel mb-4">翻译包安装说明</h2>
                <ol className="space-y-4">
                  {[
                    "下载 \".mcpack\" 后缀的资源包文件",
                    "选择\"使用 Minecraft 打开\"该文件",
                    "进入对应市场地图的创建页面",
                    '点击蓝色背景的\"解锁设置\"',
                    "进入资源包页面并激活对应的翻译资源包",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="font-pixel text-primary mr-2">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 p-4 bg-muted/50 rounded-md">
                  <h3 className="font-pixel text-lg mb-2">故障排除</h3>
                  <p className="mb-4">如果您在使用翻译包时遇到任何问题，请尝试以下操作：</p>
                  <ul className="space-y-2">
                  <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>手机用户在蓝奏云下载时要点开汉化包文件详情页才可直接下载</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>确保你使用的 Minecraft 版本兼容地图</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>确保你的语言是汉化包所对应的语言而不是其他语言（例如汉化包不支持繁体中文而你正在使用繁体中文）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>尝试将汉化资源包放于所有资源包的顶端</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        浏览我们的{" "}
                        <Link href="/troubleshooting" className="text-primary hover:underline">
                          故障排除界面
                        </Link>{" "}
                        获取更多帮助
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Button className="minecraft-btn w-full justify-center" onClick={handleDownloadClick}>
                    下载翻译包
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* More from this Studio */}
      {studioPacks.length > 0 && (
        <section className="py-8 animate-fade-in animate-delay-200">
          <div className="container">
            <h2 className="text-2xl font-pixel mb-6">更多来自 {studio ? studio.name : "无名氏"} 的地图翻译包</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studioPacks.map((studioPack) => (
                <TranslationPackCard key={studioPack.id} pack={studioPack} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Translations */}
      {similarPacks.length > 0 && (
        <section className="py-8 animate-fade-in animate-delay-300">
          <div className="container">
            <h2 className="text-2xl font-pixel mb-6">类似地图的汉化包</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarPacks.map((similarPack) => (
                <TranslationPackCard key={similarPack.id} pack={similarPack} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="py-8 animate-fade-in animate-delay-400"> {/* 添加 section 和动画延迟 */}
        <div className="container">
          <h2 className="text-2xl font-pixel mb-6">评论</h2> {/* 调整标题样式 */}
          {mounted && (
            <div className="minecraft-card p-6 mt-6"> {/* ⬅️ 新增包裹层，并应用样式 */}
              <WalineComments
                serverURL="https://comment.pling.top/"
                path={pack.id}
                dark={resolvedTheme === 'dark'} 
                lang="zh-CN"
                // reaction={true} // 如果需要，可以启用
                // ...更多 WalineInitOptions
              />
            </div>
          )}
        </div>
      </section>


      {/* Disclaimer Popup */}
      <DisclaimerPopup
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onAccept={handleDisclaimerAccept}
        packTitle={pack.title}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
); 
}