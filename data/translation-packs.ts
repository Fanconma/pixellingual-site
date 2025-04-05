import featuredPacksData from './packs.json';

export interface TranslationPack {
  id: number
  title: string
  description: string
  image: string
  screenshots: string[] // Array of image URLs
  tags: string[]
  updatedAt: string // yyyymmdd format
  createdAt: string // yyyymmdd format
  author: string
  studio: string
  isDLC?: boolean
  sectionIds: string[]
  rating: number // 0-5 scale
  price: number // 0 for free
  downloadLink: string
  languages: string[] // ["cn", "hk", "tw"]
  isFeatured?: boolean
  features: string[] // Array of features specific to this translation pack
}


// All available tags
export const TAGS = [
  "冒险",
  "生存",
  "小游戏",
  "RPG",
  "解密",
  "PvP",
  "休闲",
  "教育",
  "主题公园",
  "剧情",
]

// All available studios
export const STUDIOS = [
  {
    id: "mojang",
    name: "Mojang Studios",
    logo: "/images/studios/mojang.png",
  },
  {
    id: "everbloom",
    name: "Everbloom Games",
    logo: "/images/studios/everbloom.webp",
  },
  {
    id: "gamemode-one",
    name: "Gamemode One",
    logo: "/images/studios/gamemodeone.avif",
  },
  {
    id: "noxcrew",
    name: "Noxcrew",
    logo: "/images/studios/Noxcrew.avif",
  },
  {
    id: "shapescapre",
    name: "Shapescape",
    logo: "/images/studios/shapescape.png",
  },
  {
    id: "spark-universe",
    name: "Spark Universe",
    logo: "/placeholder.svg?height=200&width=200&text=PixelHeads",
  },
  {
    id: "cyclone",
    name: "Cyclone",
    logo: "/images/studios/cyclone.png",
  },
  {
    id: "jigarbov",
    name: "Jigarbov",
    logo: "/placeholder.svg"
  },
  {
    id: "blockception",
    name: "Block ception",
    logo: "/images/studios/blockception.png",
  },
  {
    id: "oreville",
    name: "Oreville Studios",
    logo: "/"
  }
]

// Available sections for data-driven content
export const SECTIONS = [
  {
    id: "dlc-content",
    title: "联动地图",
    description: "查看所有 Minecraft 联动地图的翻译包！",
  },
  {
    id: "popular-translations",
    title: "必须玩的地图！！",
    description: "个人认为最好玩的地图合集~",
  },
  {
    id: "free-maps",
    title: "免费地图一览",
    description: "免费的地图不得玩一玩？",
  },
  {
    id: "new-version-mc-explore",
    title: "Minecraft版本主题地图",
    description: "通过这些地图以任务的形式快速了解对应的 Minecraft 版本更新了哪些内容？",
  },
  {
    id: "educational-content",
    title: "教育地图",
    description: "在游玩的过程中学习。",
  },
  {
    id: "leisure",
    title: "养老休闲地图",
    description: "试一试慢节奏的游戏地图吧！",
  }
]

// Helper function to format date for display
export const formatDate = (dateString: string): string => {
  if (!dateString || dateString.length !== 8) return "Unknown Date"

  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ]

  const monthIndex = Number.parseInt(month, 10) - 1
  const monthName = monthNames[monthIndex]

  return `${year}年${monthName}${Number.parseInt(day, 10)}日 `
}

// Helper function to check if a pack is new or updated
export const getPackStatus = (pack: TranslationPack): { isNew: boolean; isUpdated: boolean } => {
  const currentDate = new Date()
  const createdDate = new Date(
    Number.parseInt(pack.createdAt.substring(0, 4)),
    Number.parseInt(pack.createdAt.substring(4, 6)) - 1,
    Number.parseInt(pack.createdAt.substring(6, 8)),
  )

  const updatedDate = new Date(
    Number.parseInt(pack.updatedAt.substring(0, 4)),
    Number.parseInt(pack.updatedAt.substring(4, 6)) - 1,
    Number.parseInt(pack.updatedAt.substring(6, 8)),
  )

  // Check if created within last 7 days
  const isNew = (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24) <= 7

  // Check if updated within last 7 days (and not new)
  const isUpdated = !isNew && (currentDate.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24) <= 7

  return { isNew, isUpdated }
}

// Common features for translation packs
const COMMON_FEATURES = [
  "Complete translation of all in-game text",
  "Translated custom items and their descriptions",
  "Translated quest dialogues and objectives",
  "Translated achievements and their descriptions",
  "Translated game mechanics explanations",
  "Optimized for Minecraft Bedrock Edition",
]

// Additional features by type
const ADVENTURE_FEATURES = [
  "Fully translated storyline and character dialogue",
  "Translated custom quest system",
  "Localized NPC interactions",
  "Translated custom lore books and scrolls",
]

const SURVIVAL_FEATURES = [
  "Translated custom survival mechanics",
  "Localized crafting guides",
  "Translated custom biome descriptions",
  "Localized survival tips and tutorials",
]

const EDUCATIONAL_FEATURES = [
  "Curriculum-aligned content translated with educational accuracy",
  "Translated learning objectives and assessments",
  "Localized educational guides for teachers",
  "Culturally adapted educational content",
]

// packs|| DUE TO THE Historical issue, THE NAME OF PACKS IS FEATURED_PACKS, BUT IT REFERS TO ALL PACKS!!
export const FEATURED_PACKS: TranslationPack[] = featuredPacksData as TranslationPack[];

// All translation packs
export const ALL_PACKS: TranslationPack[] = [...FEATURED_PACKS]

// Get packs by section ID
export const getPacksBySectionId = (sectionId: string): TranslationPack[] => {
  return ALL_PACKS.filter((pack) => pack.sectionIds?.includes(sectionId))
}

// Get section by ID
export const getSectionById = (sectionId: string) => {
  return SECTIONS.find((s) => s.id === sectionId)
}

// Get section title by ID
export const getSectionTitleById = (sectionId: string): string => {
  const section = SECTIONS.find((s) => s.id === sectionId)
  return section ? section.title : ""
}

// Get studio by ID
export const getStudioById = (studioId: string) => {
  return STUDIOS.find((s) => s.id === studioId)
}

// Get pack by ID
export const getPackById = (packId: number): TranslationPack | undefined => {
  return ALL_PACKS.find((pack) => pack.id === packId)
}

// Get packs by author
export const getPacksByAuthor = (author: string, excludeId?: number): TranslationPack[] => {
  return ALL_PACKS.filter((pack) => pack.author === author && (excludeId === undefined || pack.id !== excludeId))
}

// Get packs by studio
export const getPacksByStudio = (studio: string, excludeId?: number): TranslationPack[] => {
  return ALL_PACKS.filter((pack) => pack.studio === studio && (excludeId === undefined || pack.id !== excludeId))
}

// Get packs by tag
export const getPacksByTag = (tag: string, excludeId?: number): TranslationPack[] => {
  return ALL_PACKS.filter((pack) => pack.tags.includes(tag) && (excludeId === undefined || pack.id !== excludeId))
}

// Get language display name
export const getLanguageDisplayName = (code: string): string => {
  switch (code) {
    case "cn":
      return "简体中文"
    case "hk":
      return "繁體中文（香港）"
    case "tw":
      return "繁體中文（台灣）"
    default:
      return code
  }
}

// Get most recent packs
export const getMostRecentPacks = (count = 3): TranslationPack[] => {
  return [...ALL_PACKS]
    .sort((a, b) => {
      // Sort by created date (newest first)
      return Number.parseInt(b.createdAt) - Number.parseInt(a.createdAt)
    })
    .slice(0, count)
}

