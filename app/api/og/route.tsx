import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { STUDIOS } from "@/data/translation-packs"; 

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "PixelLingual"
    const description = searchParams.get("description") || "Minecraft中文翻译社区"
    const type = searchParams.get("type") || "default"
    const studioParam = searchParams.get("studio") || "" // 接收工作室名称
    const tags = searchParams.get("tags") || ""
    const rating = searchParams.get("rating") || ""
    const price = searchParams.get("price") || ""
    const coverImage = searchParams.get("coverImage") || ""
    const author = searchParams.get("author") || ""

    const isFeatured = searchParams.get("isFeatured") === "true"
    const isDLC = searchParams.get("isDLC") === "true"
    const createdAt = searchParams.get("createdAt") || ""

    // --- 获取工作室 Logo 并转换为绝对 URL ---
    const studioData = STUDIOS.find((s) => s.name === studioParam); // 根据名称查找工作室
    let studioLogo = studioData?.logo || ""; // 获取 Logo URL

    // 如果 studioLogo 是相对路径，将其转换为绝对路径
    // 确保 Next.js ImageResponse 可以加载本地 /public 目录下的图片
    if (studioLogo && studioLogo.startsWith('/')) {
        const baseUrl = new URL(request.url).origin; // 获取当前请求的基础 URL
        studioLogo = `${baseUrl}${studioLogo}`; // 拼接成绝对 URL
    }

    // 将 coverImage 也转换为绝对路径，如果它可能是相对路径的话
    let absoluteCoverImage = coverImage;
    if (absoluteCoverImage && absoluteCoverImage.startsWith('/')) {
        const baseUrl = new URL(request.url).origin;
        absoluteCoverImage = `${baseUrl}${absoluteCoverImage}`;
    }


    // 根据类型选择不同的主题
    const getTheme = (type: string) => {
      switch (type) {
        case "pack":
          return {
            primary: "#22c55e",
            secondary: "#16a34a",
            accent: "#dcfce7",
            bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
            cardBg: "rgba(30, 41, 59, 0.8)",
            textPrimary: "#ffffff",
            textSecondary: "#cbd5e1",
            shadow: "rgba(34, 197, 94, 0.3)",
          }
        case "studio":
          return {
            primary: "#f97316",
            secondary: "#ea580c",
            accent: "#fed7aa",
            bg: "linear-gradient(135deg, #1c1917 0%, #292524 25%, #44403c 50%, #292524 75%, #1c1917 100%)",
            cardBg: "rgba(41, 37, 36, 0.8)",
            textPrimary: "#ffffff",
            textSecondary: "#d6d3d1",
            shadow: "rgba(249, 115, 22, 0.3)",
          }
        case "tag":
          return {
            primary: "#3b82f6",
            secondary: "#2563eb",
            accent: "#dbeafe",
            bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4338ca 50%, #312e81 75%, #1e1b4b 100%)",
            cardBg: "rgba(49, 46, 129, 0.8)",
            textPrimary: "#ffffff",
            textSecondary: "#c7d2fe",
            shadow: "rgba(59, 130, 246, 0.3)",
          }
        default:
          return {
            primary: "#10b981",
            secondary: "#059669",
            accent: "#d1fae5",
            bg: "linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #065f46 75%, #064e3b 100%)",
            cardBg: "rgba(6, 95, 70, 0.8)",
            textPrimary: "#ffffff",
            textSecondary: "#a7f3d0",
            shadow: "rgba(16, 185, 129, 0.3)",
          }
      }
    }

    const theme = getTheme(type)

    // 动态调整标题字体大小
    const getTitleFontSize = (title: string) => {
      if (title.length > 40) return "36px"
      if (title.length > 25) return "44px"
      if (title.length > 15) return "52px"
      return "60px"
    }

    // 动态调整描述字体大小
    const getDescriptionFontSize = (desc: string) => {
      if (desc.length > 100) return "18px"
      if (desc.length > 60) return "20px"
      return "22px"
    }

    // 截断文本
    const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    }

    // 格式化日期字符串 (YYYYMMDD -> YYYY-MM-DD)
    const formatCreatedAt = (dateStr: string) => {
        if (!dateStr || dateStr.length !== 8) return ""
        return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`
    }


    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: theme.bg,
          position: "relative",
          overflow: "hidden",
          // 指定全局字体堆栈，中文优先
          fontFamily: '"Noto Sans SC", "Inter", sans-serif',
        }}
      >
        {/* 背景装饰网格 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${theme.primary}15 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, ${theme.secondary}15 0%, transparent 50%),
              linear-gradient(45deg, transparent 48%, ${theme.primary}08 49%, ${theme.primary}08 51%, transparent 52%)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px",
          }}
        />

        {/* 主容器 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "40px",
            gap: "40px",
          }}
        >
          {/* 左侧内容区域 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              zIndex: 10,
            }}
          >
            {/* 顶部品牌区域 & 类别标签 (新位置) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // 使两端对齐
                marginBottom: "20px",
                width: "100%", // 确保占据可用宽度
              }}
            >
              {/* 左侧：Logo & 品牌信息 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: theme.primary,
                    border: `4px solid ${theme.secondary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000000",
                    boxShadow: `0 8px 32px ${theme.shadow}`,
                  }}
                >
                  <img
                    src={`${new URL(request.url).origin}/favicon.ico`}
                    alt="PixelLingual Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: theme.textPrimary,
                    }}
                  >
                    PixelLingual
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "14px",
                      color: theme.textSecondary,
                    }}
                  >
                    Where Words Shape Worlds.
                  </div>
                </div>
              </div>

              {/* 右侧：类别标签 (新位置，更长更方) */}
              {type && type !== "default" && (
                <div
                  style={{
                    background: theme.primary, // 使用实色背景，更突出
                    color: "#000000", // 黑色字体
                    padding: "10px 40px", // 增加横向和纵向 padding
                    borderRadius: "12px", // 更圆润的圆角
                    fontSize: "20px", // 字体更大，更醒目
                    fontWeight: "bold",
                    textTransform: "capitalize", // 首字母大写
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 8px 24px ${theme.shadow}`, // 添加阴影
                  }}
                >
                  {type === "pack" ? "翻译包" : type === "studio" ? "工作室" : type === "tag" ? "标签" : "其他"}
                </div>
              )}
            </div>

            {/* 主要内容 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {/* 标签 (位置不变，现在不会与类别标签冲突) */}
              {tags && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  {tags
                    .split(",")
                    .slice(0, 4)
                    .map((tag, index) => (
                      <div
                        key={index}
                        style={{
                          background: `${theme.primary}20`,
                          border: `2px solid ${theme.primary}`,
                          color: theme.primary,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          display: "flex",
                        }}
                      >
                        {tag.trim()}
                      </div>
                    ))}
                </div>
              )}

              {/* 标题 */}
              <div
                style={{
                  display: "flex",
                  fontSize: getTitleFontSize(title),
                  fontWeight: "bold",
                  color: theme.textPrimary,
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  textShadow: `0 4px 8px ${theme.shadow}`,
                }}
              >
                {truncateText(title, 50)}
              </div>

              {/* 描述 */}
              <div
                style={{
                  display: "flex",
                  fontSize: getDescriptionFontSize(description),
                  color: theme.textSecondary,
                  lineHeight: 1.4,
                  marginBottom: "20px",
                }}
              >
                {truncateText(description, 120)}
              </div>

              {/* 信息卡片区域 */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "20px", // 增加与下方工作室/更新时间文字的间距
                }}
              >
                {/* 评分 */}
                {rating && (
                  <div
                    style={{
                      background: theme.cardBg,
                      border: `2px solid ${theme.primary}40`,
                      borderRadius: "12px",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        color: "#fbbf24",
                        fontSize: "20px",
                      }}
                    >
                      ⭐
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: theme.textPrimary,
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {rating}
                    </div>
                  </div>
                )}

                {/* 价格 */}
                {price && (
                  <div
                    style={{
                      background: theme.cardBg,
                      border: `2px solid ${theme.primary}40`,
                      borderRadius: "12px",
                      padding: "12px 16px",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        color: theme.primary,
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {price === "0" ? "FREE" : `${price} MC`}
                    </div>
                  </div>
                )}

                {/* 作者卡片 */}
                {author && (
                  <div
                    style={{
                      background: theme.cardBg,
                      border: `2px solid ${theme.primary}40`,
                      borderRadius: "12px",
                      padding: "12px 16px",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        color: theme.textSecondary,
                        fontSize: "16px",
                      }}
                    >
                      翻译:
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: theme.textPrimary,
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {truncateText(author, 20)}
                    </div>
                  </div>
                )}
              </div>

              {/* 工作室和更新时间 (在所有卡片下方，以文字形式显示，包含Logo) */}
              {(studioParam || createdAt) && ( 
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px", // 两行之间的间距
                    color: theme.textSecondary,
                    fontSize: "16px",
                  }}
                >
                  {/* Studio Logo and Name */}
                  {studioParam && ( // 仅当工作室名称存在时显示此行
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}> {/* Increased gap */}
                      {studioLogo && ( // 仅当 Logo 存在时显示 Logo 图片
                        <img
                          src={studioLogo} 
                          alt={`${studioParam} Logo`}
                          style={{
                            height: "48px", // 调整 Logo 高度
                            width: "150px", 
                            borderRadius: "12px", 
                            objectFit: "contain", 
                            padding: "4px", // Logo 内部边距
                          }}
                        />
                      )}
                      <span style={{ color: theme.primary, fontWeight: "bold", fontSize: "28px" }}> {/* Larger font */}
                        {truncateText(studioParam, 25)} 
                      </span>
                    </div>
                  )}
                  
                  {/* Created At */}
                  {createdAt && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: theme.textSecondary, fontSize: "14px" }}>
                        更新时间:
                      </span>
                      <span style={{ color: theme.textPrimary, fontWeight: "bold", fontSize: "16px" }}>
                        {formatCreatedAt(createdAt)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 底部信息 (保持简洁) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {/* 底部保留空间或放置其他通用信息 */}
            </div>
          </div>

          {/* 右侧封面区域 */}
          {coverImage && type === "pack" ? (
            <div
              style={{
                width: "320px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* 封面图片容器 - DLC和推荐标签将放置在其内部 */}
              <div
                style={{
                  width: "280px",
                  height: "400px",
                  background: theme.cardBg,
                  border: `4px solid ${theme.primary}`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden", // 裁剪图片的关键
                  boxShadow: `0 20px 40px ${theme.shadow}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* 实际的封面图片 */}
                <img
                  src={absoluteCoverImage}
                  alt="Cover Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 裁剪图片以覆盖容器，不留空白
                    objectPosition: "center",
                    borderRadius: "12px",
                  }}
                />

                {/* 覆盖层渐变，让图片底部看起来更融合 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: `linear-gradient(transparent, ${theme.cardBg}90)`,
                    zIndex: 15,
                  }}
                />

                {/* DLC 标签 (置于图片左上角) */}
                {isDLC && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#fbbf24", // 黄底
                      color: "#000000", // 黑字
                      padding: "6px 10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      zIndex: 20,
                      display: "flex",
                    }}
                  >
                    DLC
                  </div>
                )}

                {/* 推荐标签 (置于图片左上角，如果DLC存在则在其下方) */}
                {isFeatured && (
                  <div
                    style={{
                      position: "absolute",
                      top: isDLC ? "60px" : "12px",
                      left: "12px",
                      background: "#ef4444", // 红底
                      color: "#ffffff", // 白字
                      padding: "6px 10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      zIndex: 20,
                      display: "flex",
                    }}
                  >
                    推荐
                  </div>
                )}
              </div>

              {/* 装饰性像素块 */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "24px",
                  height: "24px",
                  background: theme.primary,
                  border: `2px solid ${theme.secondary}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "40px",
                  width: "20px",
                  height: "20px",
                  background: theme.secondary,
                  border: `2px solid ${theme.primary}`,
                }}
              />
            </div>
          ) : (
            // 右侧装饰区域（当没有封面图片或类型不是pack时）
            <div
              style={{
                width: "320px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* 大型装饰图标 */}
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background: `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40)`,
                  border: `6px solid ${theme.primary}`,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "80px",
                  boxShadow: `0 20px 40px ${theme.shadow}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {type === "studio" ? "🏢" : type === "tag" ? "🏷️" : "🎯"}
              </div>

              {/* 装饰性像素块 */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `${16 + (i % 3) * 8}px`,
                    height: `${16 + (i % 3) * 8}px`,
                    background: i % 2 === 0 ? theme.primary : theme.secondary,
                    border: `2px solid ${i % 2 === 0 ? theme.secondary : theme.primary}`,
                    top: `${20 + i * 80}px`,
                    right: `${20 + (i % 2) * 30}px`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 底部渐变 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: `linear-gradient(transparent, ${theme.primary}20)`,
          }}
        />

        {/* 左下角免责声明 */}
        <div
          style={{
            position: "absolute",
            bottom: "20px", // 距离底部
            left: "40px",  // 距离左侧
            fontSize: "12px",
            color: theme.textSecondary,
            opacity: 0.8, // 略微透明，更显低调
            zIndex: 20, // 确保在其他背景层之上
            fontFamily: "Inter, sans-serif", // 英文文本可以优先使用英文字体
          }}
        >
          {/* 使用 || 操作符为 author 和 studioParam 提供默认文本，确保字符串完整性 */}
          {`PixelLingual and ${truncateText(author, 15) || 'the author'} are not affiliated with the studio ${truncateText(studioParam, 20) || 'shown'}.`}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        // 将直接获取到的字体数据传递给 ImageResponse
        // 如果你的环境支持，可以在这里加载字体
        // fonts: [
        //   {
        //     name: 'Noto Sans SC',
        //     data: fontData, // 假设 fontData 是你加载的字体数据
        //     weight: 400,
        //     style: 'normal',
        //   },
        //   {
        //     name: 'Inter',
        //     data: interFontData, // 假设 interFontData 是你加载的 Inter 字体数据
        //     weight: 400,
        //     style: 'normal',
        //   },
        // ],
      },
    )
  } catch (e: any) {
    console.error(`Error generating image: ${e.message}`)
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    })
  }
}