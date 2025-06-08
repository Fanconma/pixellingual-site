import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "PixelLingual"
    const description = searchParams.get("description") || "Minecraft中文翻译社区"
    const type = searchParams.get("type") || "default"
    const studio = searchParams.get("studio") || ""
    const tags = searchParams.get("tags") || ""

    // 根据类型选择不同的背景色和图标
    const getThemeColors = (type: string) => {
      switch (type) {
        case "pack":
          return {
            bg: "linear-gradient(135deg, #1a1a1a 0%, #2d5a27 50%, #1a1a1a 100%)",
            accent: "#4ade80",
            secondary: "#22c55e",
          }
        case "studio":
          return {
            bg: "linear-gradient(135deg, #1a1a1a 0%, #7c2d12 50%, #1a1a1a 100%)",
            accent: "#f97316",
            secondary: "#ea580c",
          }
        case "tag":
          return {
            bg: "linear-gradient(135deg, #1a1a1a 0%, #1e40af 50%, #1a1a1a 100%)",
            accent: "#3b82f6",
            secondary: "#2563eb",
          }
        default:
          return {
            bg: "linear-gradient(135deg, #1a1a1a 0%, #166534 50%, #1a1a1a 100%)",
            accent: "#10b981",
            secondary: "#059669",
          }
      }
    }

    const colors = getThemeColors(type)

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* 背景装饰 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
                radial-gradient(circle at 20% 20%, ${colors.accent}20 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${colors.secondary}20 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, ${colors.accent}10 0%, transparent 50%)
              `,
          }}
        />

        {/* Minecraft风格的像素装饰 */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            background: colors.accent,
            border: `4px solid ${colors.secondary}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "40px",
            height: "40px",
            background: colors.secondary,
            border: `4px solid ${colors.accent}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            background: colors.secondary,
            border: `4px solid ${colors.accent}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "40px",
            height: "40px",
            background: colors.accent,
            border: `4px solid ${colors.secondary}`,
          }}
        />

        {/* 主要内容 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
            maxWidth: "900px",
          }}
        >
          {/* Logo区域 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: colors.accent,
                border: `6px solid ${colors.secondary}`,
                marginRight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              PL
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#ffffff",
                fontFamily: "monospace",
              }}
            >
              PixelLingual
            </div>
          </div>

          {/* 标题 */}
          <div
            style={{
              fontSize: title.length > 30 ? "48px" : "64px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: 1.2,
              textAlign: "center",
              fontFamily: "monospace",
            }}
          >
            {title}
          </div>

          {/* 描述 */}
          {description && (
            <div
              style={{
                fontSize: "24px",
                color: "#d1d5db",
                marginBottom: "30px",
                lineHeight: 1.4,
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              {description}
            </div>
          )}

          {/* 标签和工作室信息 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {studio && (
              <div
                style={{
                  background: colors.secondary,
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {studio}
              </div>
            )}
            {tags &&
              tags
                .split(",")
                .slice(0, 3)
                .map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      background: `${colors.accent}40`,
                      border: `2px solid ${colors.accent}`,
                      color: colors.accent,
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {tag.trim()}
                  </div>
                ))}
          </div>

          {/* 底部标语 */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "18px",
              color: "#9ca3af",
              fontFamily: "monospace",
            }}
          >
            Minecraft中文翻译 • 免费下载
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
