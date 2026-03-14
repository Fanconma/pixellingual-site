/**
 * Event Theme System - 活动主题配置系统
 * 
 * 用于为特殊活动地图的详情页添加高度可定制的装饰性内容。
 * 支持根据特定ID或活动类型动态改变页面元素的主题颜色和样式。
 */

export interface EventThemeColors {
  // 主要颜色 (按钮背景、强调色)
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  
  // 强调色 (徽章、高亮)
  accent: string;
  accentForeground: string;
  
  // 边框和发光效果
  borderColor: string;
  glowColor: string;
  
  // 文本颜色
  textPrimary?: string;
  textSecondary?: string;
}

export interface EventThemeDecorations {
  // 背景装饰
  backgroundImage?: string;
  backgroundOverlay?: string;
  backgroundPattern?: string;
  
  // 徽章/标签
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
    icon?: string;
  };
  
  // 顶部横幅
  banner?: {
    enabled: boolean;
    text?: string;
    bgGradient?: string;
    textColor?: string;
  };
  
  // 浮动装饰元素
  floatingElements?: {
    type: 'particles' | 'icons' | 'images' | 'custom';
    items?: string[];
    colors?: string[];
    density?: 'low' | 'medium' | 'high';
  };
  
  // 边框样式
  borderStyle?: 'solid' | 'gradient' | 'animated' | 'glow';
  
  // 动画效果
  animations?: {
    cardHover?: 'scale' | 'glow' | 'shake' | 'bounce' | 'none';
    buttonPulse?: boolean;
    titleShimmer?: boolean;
  };
}

export interface EventTheme {
  id: string;
  name: string;
  description?: string;
  
  // 颜色配置
  colors: EventThemeColors;
  
  // 装饰配置
  decorations?: EventThemeDecorations;
  
  // CSS变量覆盖（用于更细粒度的控制）
  cssVariables?: Record<string, string>;
  
  // 自定义类名
  customClasses?: {
    container?: string;
    card?: string;
    button?: string;
    badge?: string;
    title?: string;
  };
}

// ============================================
// 预定义主题 - Predefined Themes
// ============================================

export const EVENT_THEMES: Record<string, EventTheme> = {
  // 金色/庆典主题 - 适用于周年庆、特殊节日等
  golden: {
    id: 'golden',
    name: '金色庆典',
    description: '璀璨金色主题，适合周年庆和特殊庆典活动',
    colors: {
      primary: '#D4AF37',
      primaryForeground: '#1A1A1A',
      primaryHover: '#B8960C',
      accent: '#FFD700',
      accentForeground: '#1A1A1A',
      borderColor: '#D4AF37',
      glowColor: 'rgba(212, 175, 55, 0.4)',
    },
    decorations: {
      badge: {
        text: '限时活动',
        bgColor: '#D4AF37',
        textColor: '#1A1A1A',
      },
      animations: {
        buttonPulse: true,
        titleShimmer: true,
      },
      borderStyle: 'glow',
    },
    cssVariables: {
      '--event-primary': '43 74% 53%',
      '--event-primary-foreground': '0 0% 10%',
      '--event-glow': 'rgba(212, 175, 55, 0.3)',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]',
      badge: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black',
    },
  },

  // 圣诞节主题
  christmas: {
    id: 'christmas',
    name: '圣诞节',
    description: '温馨圣诞主题，红绿配色',
    colors: {
      primary: '#C41E3A',
      primaryForeground: '#FFFFFF',
      primaryHover: '#A01830',
      accent: '#228B22',
      accentForeground: '#FFFFFF',
      borderColor: '#C41E3A',
      glowColor: 'rgba(196, 30, 58, 0.4)',
    },
    decorations: {
      badge: {
        text: '圣诞特别版',
        bgColor: '#C41E3A',
        textColor: '#FFFFFF',
      },
      floatingElements: {
        type: 'icons',
        items: ['snowflake', 'gift', 'star'],
        colors: ['#FFFFFF', '#C41E3A', '#228B22'],
        density: 'medium',
      },
      banner: {
        enabled: true,
        text: '圣诞快乐!',
        bgGradient: 'linear-gradient(135deg, #C41E3A 0%, #228B22 100%)',
        textColor: '#FFFFFF',
      },
    },
    cssVariables: {
      '--event-primary': '350 81% 45%',
      '--event-accent': '120 61% 34%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-[0_0_15px_rgba(196,30,58,0.3)]',
    },
  },

  // 春节/新年主题
  lunar_new_year: {
    id: 'lunar_new_year',
    name: '新春佳节',
    description: '中国春节主题，红金配色',
    colors: {
      primary: '#DE2910',
      primaryForeground: '#FFD700',
      primaryHover: '#B71C0C',
      accent: '#FFD700',
      accentForeground: '#DE2910',
      borderColor: '#FFD700',
      glowColor: 'rgba(255, 215, 0, 0.4)',
    },
    decorations: {
      badge: {
        text: '新春限定',
        bgColor: '#DE2910',
        textColor: '#FFD700',
      },
      backgroundPattern: 'url("/images/patterns/chinese-pattern.png")',
      animations: {
        cardHover: 'glow',
        buttonPulse: true,
      },
    },
    cssVariables: {
      '--event-primary': '6 85% 47%',
      '--event-accent': '51 100% 50%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-yellow-300 font-bold shadow-[0_0_20px_rgba(222,41,16,0.4)]',
      badge: 'bg-red-600 text-yellow-300 border border-yellow-400',
    },
  },

  // 万圣节主题
  halloween: {
    id: 'halloween',
    name: '万圣节',
    description: '诡异万圣节主题，橙紫配色',
    colors: {
      primary: '#FF6600',
      primaryForeground: '#000000',
      primaryHover: '#E65C00',
      accent: '#8B008B',
      accentForeground: '#FFFFFF',
      borderColor: '#FF6600',
      glowColor: 'rgba(255, 102, 0, 0.4)',
    },
    decorations: {
      badge: {
        text: '万圣节特辑',
        bgColor: '#FF6600',
        textColor: '#000000',
      },
      floatingElements: {
        type: 'icons',
        items: ['ghost', 'bat', 'pumpkin'],
        colors: ['#FF6600', '#8B008B', '#FFFFFF'],
        density: 'medium',
      },
    },
    cssVariables: {
      '--event-primary': '24 100% 50%',
      '--event-accent': '300 100% 27%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-black font-bold',
      container: 'bg-gradient-to-b from-purple-900/10 to-orange-900/10',
    },
  },

  // 紫色/神秘主题 - 适用于魔法/奇幻地图
  mystical: {
    id: 'mystical',
    name: '神秘魔法',
    description: '神秘紫色主题，适合魔法和奇幻类地图',
    colors: {
      primary: '#8B5CF6',
      primaryForeground: '#FFFFFF',
      primaryHover: '#7C3AED',
      accent: '#C084FC',
      accentForeground: '#1A1A1A',
      borderColor: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.4)',
    },
    decorations: {
      badge: {
        text: '魔法世界',
        bgColor: '#8B5CF6',
        textColor: '#FFFFFF',
      },
      animations: {
        cardHover: 'glow',
        titleShimmer: true,
      },
      borderStyle: 'gradient',
    },
    cssVariables: {
      '--event-primary': '262 83% 66%',
      '--event-accent': '280 68% 75%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]',
    },
  },

  // 海洋/水下主题
  ocean: {
    id: 'ocean',
    name: '深海探索',
    description: '清爽海洋主题，适合水下和海洋类地图',
    colors: {
      primary: '#0EA5E9',
      primaryForeground: '#FFFFFF',
      primaryHover: '#0284C7',
      accent: '#06B6D4',
      accentForeground: '#FFFFFF',
      borderColor: '#0EA5E9',
      glowColor: 'rgba(14, 165, 233, 0.4)',
    },
    decorations: {
      badge: {
        text: '海洋世界',
        bgColor: '#0EA5E9',
        textColor: '#FFFFFF',
      },
      floatingElements: {
        type: 'particles',
        colors: ['#0EA5E9', '#06B6D4', '#7DD3FC'],
        density: 'low',
      },
    },
    cssVariables: {
      '--event-primary': '199 89% 48%',
      '--event-accent': '187 87% 43%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white',
    },
  },

  // 末地/黑暗主题
  endgame: {
    id: 'endgame',
    name: '末地探险',
    description: '神秘末地主题，适合末地相关地图',
    colors: {
      primary: '#A855F7',
      primaryForeground: '#000000',
      primaryHover: '#9333EA',
      accent: '#2DD4BF',
      accentForeground: '#000000',
      borderColor: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.5)',
    },
    decorations: {
      badge: {
        text: '末地之旅',
        bgColor: '#A855F7',
        textColor: '#000000',
      },
      backgroundOverlay: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)',
      animations: {
        cardHover: 'glow',
        buttonPulse: true,
      },
    },
    cssVariables: {
      '--event-primary': '271 81% 68%',
      '--event-accent': '168 76% 50%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-purple-500 to-fuchsia-400 hover:from-purple-600 hover:to-fuchsia-500 text-black font-bold shadow-[0_0_25px_rgba(168,85,247,0.5)]',
    },
  },

  // 科技/未来主题
  futuristic: {
    id: 'futuristic',
    name: '未来科技',
    description: '赛博朋克风格，适合科技和未来类地图',
    colors: {
      primary: '#00D9FF',
      primaryForeground: '#000000',
      primaryHover: '#00B8D9',
      accent: '#FF00FF',
      accentForeground: '#000000',
      borderColor: '#00D9FF',
      glowColor: 'rgba(0, 217, 255, 0.5)',
    },
    decorations: {
      badge: {
        text: '未来世界',
        bgColor: '#00D9FF',
        textColor: '#000000',
      },
      borderStyle: 'animated',
      animations: {
        cardHover: 'glow',
        titleShimmer: true,
      },
    },
    cssVariables: {
      '--event-primary': '187 100% 50%',
      '--event-accent': '300 100% 50%',
    },
    customClasses: {
      button: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold shadow-[0_0_20px_rgba(0,217,255,0.5)] border border-cyan-300/50',
    },
  },
};

// ============================================
// 主题映射配置 - Theme Mapping Config
// ============================================

export interface ThemeMapping {
  // 按 pack ID 映射
  byPackId?: Record<string, string>;
  
  // 按标签映射（如果pack包含指定标签）
  byTag?: Record<string, string>;
  
  // 按分区ID映射
  bySectionId?: Record<string, string>;
  
  // 按工作室映射
  byStudio?: Record<string, string>;
  
  // DLC专属主题
  dlcTheme?: string;
  
  // 免费地图主题
  freeMapTheme?: string;
}

// 默认主题映射配置
// 可以通过修改此配置来为特定地图、标签、分区或工作室应用主题
export const DEFAULT_THEME_MAPPING: ThemeMapping = {
  byPackId: {
    // 为特定地图ID指定主题
    'uZHPlBGRBB': 'golden',     // 蝙蝠侠地图 - 金色主题（DC联动）
    'lmUm1rHPW7': 'mystical',   // 冰雪奇缘 - 神秘魔法主题
    'QoLJpZSTYI': 'golden',     // 小黄人 - 金色主题（联动地图）
    'rfaVpHZXw1': 'futuristic', // 少年骇客 - 科技主题（Omnitrix）
  },
  byTag: {
    // 按标签自动应用主题
    // 'RPG': 'mystical',
    // '解密': 'endgame',
  },
  bySectionId: {
    // 按分区自动应用主题
    // 'dlc-content': 'golden',
  },
  byStudio: {
    // 按工作室自动应用主题
    // 'noxcrew': 'ocean',
  },
};

// ============================================
// 辅助函数 - Helper Functions
// ============================================

import type { TranslationPack } from '@/data/translation-packs';

/**
 * 获取指定 pack 应该使用的主题
 */
export function getThemeForPack(
  pack: TranslationPack,
  customMapping?: ThemeMapping
): EventTheme | null {
  const mapping = customMapping || DEFAULT_THEME_MAPPING;
  
  // 1. 首先检查 pack 自身的 eventTheme 配置（最高优先级）
  if ((pack as TranslationPack & { eventTheme?: string }).eventTheme) {
    const themeId = (pack as TranslationPack & { eventTheme?: string }).eventTheme!;
    return EVENT_THEMES[themeId] || null;
  }
  
  // 2. 按 pack ID 映射
  if (mapping.byPackId && mapping.byPackId[pack.id]) {
    return EVENT_THEMES[mapping.byPackId[pack.id]] || null;
  }
  
  // 3. 按标签映射
  if (mapping.byTag) {
    for (const tag of pack.tags) {
      if (mapping.byTag[tag]) {
        return EVENT_THEMES[mapping.byTag[tag]] || null;
      }
    }
  }
  
  // 4. 按分区ID映射
  if (mapping.bySectionId && pack.sectionIds) {
    for (const sectionId of pack.sectionIds) {
      if (mapping.bySectionId[sectionId]) {
        return EVENT_THEMES[mapping.bySectionId[sectionId]] || null;
      }
    }
  }
  
  // 5. 按工作室映射
  if (mapping.byStudio && mapping.byStudio[pack.studio]) {
    return EVENT_THEMES[mapping.byStudio[pack.studio]] || null;
  }
  
  // 6. DLC 专属主题
  if (pack.isDLC && mapping.dlcTheme) {
    return EVENT_THEMES[mapping.dlcTheme] || null;
  }
  
  // 7. 免费地图主题
  if (pack.price === 0 && mapping.freeMapTheme) {
    return EVENT_THEMES[mapping.freeMapTheme] || null;
  }
  
  return null;
}

/**
 * 生成主题的CSS变量样式对象
 */
export function getThemeCSSVariables(theme: EventTheme): React.CSSProperties {
  const variables: Record<string, string> = {};
  
  // 添加预定义的CSS变量
  if (theme.cssVariables) {
    for (const [key, value] of Object.entries(theme.cssVariables)) {
      variables[key] = value;
    }
  }
  
  // 添加颜色相关变量
  variables['--event-glow-color'] = theme.colors.glowColor;
  variables['--event-border-color'] = theme.colors.borderColor;
  
  return variables as React.CSSProperties;
}

/**
 * 获取主题按钮的class
 */
export function getThemeButtonClass(theme: EventTheme | null): string {
  if (!theme) return '';
  return theme.customClasses?.button || '';
}

/**
 * 获取主题徽章的class
 */
export function getThemeBadgeClass(theme: EventTheme | null): string {
  if (!theme) return '';
  return theme.customClasses?.badge || '';
}

/**
 * 获取所有可用主题列表
 */
export function getAllThemes(): EventTheme[] {
  return Object.values(EVENT_THEMES);
}

/**
 * 根据ID获取主题
 */
export function getThemeById(themeId: string): EventTheme | null {
  return EVENT_THEMES[themeId] || null;
}
