import { AlertTriangle, Gift, Megaphone, Star, Heart, Zap, Info } from "lucide-react"

export interface Banner {
  id: string
  type: "warning" | "promotion" | "announcement" | "info" | "success" | "error" | "new" | "event"
  title: string
  message: string
  icon?: any
  backgroundColor: string
  textColor: string
  borderColor: string
  buttonText?: string
  buttonLink?: string
  startTime?: string // ISO string
  endTime?: string // ISO string
  priority: number // Higher number = higher priority
  dismissible: boolean
  autoHide?: boolean
  autoHideDelay?: number // in milliseconds
}

// 预制主题配置
export const BANNER_THEMES = {
  warning: {
    backgroundColor: "bg-yellow-600",
    textColor: "text-yellow-50",
    borderColor: "border-yellow-500",
    icon: AlertTriangle,
  },
  promotion: {
    backgroundColor: "bg-green-600",
    textColor: "text-green-50",
    borderColor: "border-green-500",
    icon: Gift,
  },
  announcement: {
    backgroundColor: "bg-blue-600",
    textColor: "text-blue-50",
    borderColor: "border-blue-500",
    icon: Megaphone,
  },
  info: {
    backgroundColor: "bg-gray-600",
    textColor: "text-gray-50",
    borderColor: "border-gray-500",
    icon: Info,
  },
  success: {
    backgroundColor: "bg-emerald-600",
    textColor: "text-emerald-50",
    borderColor: "border-emerald-500",
    icon: Star,
  },
  error: {
    backgroundColor: "bg-red-600",
    textColor: "text-red-50",
    borderColor: "border-red-500",
    icon: AlertTriangle,
  },
  new: {
    backgroundColor: "bg-purple-600",
    textColor: "text-purple-50",
    borderColor: "border-purple-500",
    icon: Zap,
  },
  event: {
    backgroundColor: "bg-pink-600",
    textColor: "text-pink-50",
    borderColor: "border-pink-500",
    icon: Heart,
  },
}

// 当前活跃的横幅配置
export const ACTIVE_BANNERS: Banner[] = [
    // {
    //     id: "no-using-cracked-packs",
    //     type: "warning",
    //     title: "请勿使用他人盗搬的PLG翻译包",
    //     message: "PixelLingual 谴责倒搬行为。盗搬既是对翻译作者的不尊重，也是对翻译社区的伤害。",
    //     backgroundColor: BANNER_THEMES.warning.backgroundColor,
    //     textColor: BANNER_THEMES.warning.textColor,
    //     borderColor: BANNER_THEMES.warning.borderColor,
    //     icon: BANNER_THEMES.warning.icon,
    //     buttonText: "了解更多",
    //     buttonLink: "https://docs.qq.com/aio/p/sczle9it02uebmq?p=M0Xeir1ipGxVUxjVZUjaZv",
    //     priority: 100,
    //     dismissible: true,
    // }
//   {
//     id: "new-year-2024",
//     type: "event",
//     title: "新年快乐！",
//     message: "感谢大家一年来对PixelLingual的支持，新的一年我们将带来更多精彩翻译！",
//     backgroundColor: BANNER_THEMES.event.backgroundColor,
//     textColor: BANNER_THEMES.event.textColor,
//     borderColor: BANNER_THEMES.event.borderColor,
//     icon: BANNER_THEMES.event.icon,
//     buttonText: "查看新年活动",
//     buttonLink: "/events/new-year",
//     startTime: "2024-01-01T00:00:00Z",
//     endTime: "2024-01-31T23:59:59Z",
//     priority: 10,
//     dismissible: true,
//   },
//   {
//     id: "minecraft-1-21-update",
//     type: "announcement",
//     title: "Minecraft 1.21 翻译包已发布！",
//     message: "最新版本的Minecraft翻译包现已可用，包含所有新内容的中文翻译。",
//     backgroundColor: BANNER_THEMES.announcement.backgroundColor,
//     textColor: BANNER_THEMES.announcement.textColor,
//     borderColor: BANNER_THEMES.announcement.borderColor,
//     icon: BANNER_THEMES.announcement.icon,
//     buttonText: "立即下载",
//     buttonLink: "/market/minecraft-1-21",
//     priority: 8,
//     dismissible: true,
//   },
//   {
//     id: "server-maintenance",
//     type: "warning",
//     title: "服务器维护通知",
//     message: "我们将在今晚23:00-01:00进行服务器维护，期间可能无法下载翻译包。",
//     backgroundColor: BANNER_THEMES.warning.backgroundColor,
//     textColor: BANNER_THEMES.warning.textColor,
//     borderColor: BANNER_THEMES.warning.borderColor,
//     icon: BANNER_THEMES.warning.icon,
//     buttonText: "了解详情",
//     buttonLink: "/maintenance",
//     startTime: "2024-01-15T10:00:00Z",
//     endTime: "2024-01-16T02:00:00Z",
//     priority: 9,
//     dismissible: true,
//     autoHide: true,
//     autoHideDelay: 10000,
//   },
//   {
//     id: "community-milestone",
//     type: "success",
//     title: "社区里程碑达成！",
//     message: "PixelLingual社区用户突破10万，感谢每一位支持者！",
//     backgroundColor: BANNER_THEMES.success.backgroundColor,
//     textColor: BANNER_THEMES.success.textColor,
//     borderColor: BANNER_THEMES.success.borderColor,
//     icon: BANNER_THEMES.success.icon,
//     buttonText: "加入庆祝",
//     buttonLink: "/community/milestone",
//     priority: 7,
//     dismissible: true,
//   },
//   {
//     id: "translation-contest",
//     type: "promotion",
//     title: "翻译大赛开始啦！",
//     message: "参与我们的翻译大赛，赢取丰厚奖品和专属徽章！",
//     backgroundColor: BANNER_THEMES.promotion.backgroundColor,
//     textColor: BANNER_THEMES.promotion.textColor,
//     borderColor: BANNER_THEMES.promotion.borderColor,
//     icon: BANNER_THEMES.promotion.icon,
//     buttonText: "立即参与",
//     buttonLink: "/contest/translation-2024",
//     startTime: "2024-01-10T00:00:00Z",
//     endTime: "2024-02-10T23:59:59Z",
//     priority: 6,
//     dismissible: true,
//   },
]

// 获取当前应该显示的横幅
export function getActiveBanner(): Banner | null {
  const now = new Date()

  // 获取已关闭的横幅ID列表
  const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")

  // 筛选符合条件的横幅
  const validBanners = ACTIVE_BANNERS.filter((banner) => {
    // 检查是否已被关闭
    if (dismissedBanners.includes(banner.id)) {
      return false
    }

    // 检查开始时间
    if (banner.startTime && new Date(banner.startTime) > now) {
      return false
    }

    // 检查结束时间
    if (banner.endTime && new Date(banner.endTime) < now) {
      return false
    }

    return true
  })

  // 按优先级排序，返回优先级最高的横幅
  if (validBanners.length === 0) {
    return null
  }

  return validBanners.sort((a, b) => b.priority - a.priority)[0]
}

// 关闭横幅
export function dismissBanner(bannerId: string) {
  const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")
  if (!dismissedBanners.includes(bannerId)) {
    dismissedBanners.push(bannerId)
    localStorage.setItem("dismissedBanners", JSON.stringify(dismissedBanners))
  }
}

// 清除已关闭的横幅记录（用于测试或重置）
export function clearDismissedBanners() {
  localStorage.removeItem("dismissedBanners")
}
