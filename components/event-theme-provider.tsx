"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { EventTheme } from "@/lib/event-themes";
import {
  getThemeForPack,
  getThemeCSSVariables,
  type ThemeMapping,
} from "@/lib/event-themes";
import type { TranslationPack } from "@/data/translation-packs";
import { cn } from "@/lib/utils";

// ============================================
// Context Definition
// ============================================

interface EventThemeContextValue {
  theme: EventTheme | null;
  hasTheme: boolean;
  colors: EventTheme["colors"] | null;
  decorations: EventTheme["decorations"] | null;
  customClasses: EventTheme["customClasses"] | null;
}

const EventThemeContext = createContext<EventThemeContextValue>({
  theme: null,
  hasTheme: false,
  colors: null,
  decorations: null,
  customClasses: null,
});

// ============================================
// Provider Component
// ============================================

interface EventThemeProviderProps {
  children: React.ReactNode;
  pack: TranslationPack;
  customMapping?: ThemeMapping;
  /** 强制使用指定主题ID（覆盖自动检测） */
  forceThemeId?: string;
}

export function EventThemeProvider({
  children,
  pack,
  customMapping,
  forceThemeId,
}: EventThemeProviderProps) {
  const theme = useMemo(() => {
    if (forceThemeId) {
      const { EVENT_THEMES } = require("@/lib/event-themes");
      return EVENT_THEMES[forceThemeId] || null;
    }
    return getThemeForPack(pack, customMapping);
  }, [pack, customMapping, forceThemeId]);

  const value = useMemo<EventThemeContextValue>(
    () => ({
      theme,
      hasTheme: theme !== null,
      colors: theme?.colors || null,
      decorations: theme?.decorations || null,
      customClasses: theme?.customClasses || null,
    }),
    [theme]
  );

  const cssVariables = theme ? getThemeCSSVariables(theme) : {};

  return (
    <EventThemeContext.Provider value={value}>
      <div style={cssVariables} className={cn(theme?.customClasses?.container)}>
        {children}
      </div>
    </EventThemeContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useEventTheme() {
  return useContext(EventThemeContext);
}

// ============================================
// Themed Components
// ============================================

interface ThemedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
}

/**
 * 自动应用活动主题样式的按钮组件
 */
export function ThemedButton({
  variant = "primary",
  children,
  className,
  fallbackClassName,
  ...props
}: ThemedButtonProps) {
  const { theme, hasTheme } = useEventTheme();

  const themeButtonClass = hasTheme && theme?.customClasses?.button;

  return (
    <button
      className={cn(
        // 基础样式
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-pixel text-base transition-all duration-300",
        // 如果有主题，使用主题样式；否则使用fallback
        themeButtonClass || fallbackClassName,
        className
      )}
      style={
        hasTheme && !themeButtonClass
          ? {
              backgroundColor: theme?.colors.primary,
              color: theme?.colors.primaryForeground,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
}

interface ThemedBadgeProps {
  children?: React.ReactNode;
  className?: string;
  /** 是否显示主题自带的徽章文字 */
  useThemeBadgeText?: boolean;
}

/**
 * 自动应用活动主题样式的徽章组件
 */
export function ThemedBadge({
  children,
  className,
  useThemeBadgeText = false,
}: ThemedBadgeProps) {
  const { theme, hasTheme, decorations } = useEventTheme();

  if (!hasTheme) return null;

  const badgeConfig = decorations?.badge;
  const displayText = useThemeBadgeText && badgeConfig?.text ? badgeConfig.text : children;

  if (!displayText && !badgeConfig?.text) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-pixel text-xs font-bold shadow-lg backdrop-blur-sm",
        theme?.customClasses?.badge,
        className
      )}
      style={
        !theme?.customClasses?.badge && badgeConfig
          ? {
              backgroundColor: badgeConfig.bgColor,
              color: badgeConfig.textColor,
            }
          : undefined
      }
    >
      {displayText}
    </span>
  );
}

interface ThemedBannerProps {
  className?: string;
}

/**
 * 活动主题横幅组件
 */
export function ThemedBanner({ className }: ThemedBannerProps) {
  const { decorations, hasTheme } = useEventTheme();

  if (!hasTheme || !decorations?.banner?.enabled) return null;

  const banner = decorations.banner;

  return (
    <div
      className={cn(
        "w-full py-2 px-4 text-center font-pixel text-sm",
        className
      )}
      style={{
        background: banner.bgGradient || "var(--event-primary)",
        color: banner.textColor || "white",
      }}
    >
      {banner.text}
    </div>
  );
}

interface ThemedGlowProps {
  children: React.ReactNode;
  className?: string;
  /** 发光强度 */
  intensity?: "low" | "medium" | "high";
}

/**
 * 为子元素添加主题发光效果的包装组件
 */
export function ThemedGlow({
  children,
  className,
  intensity = "medium",
}: ThemedGlowProps) {
  const { theme, hasTheme } = useEventTheme();

  if (!hasTheme) return <>{children}</>;

  const intensityMap = {
    low: "0 0 10px",
    medium: "0 0 20px",
    high: "0 0 30px",
  };

  return (
    <div
      className={cn("transition-shadow duration-300", className)}
      style={{
        boxShadow: `${intensityMap[intensity]} ${theme?.colors.glowColor}`,
      }}
    >
      {children}
    </div>
  );
}

interface ThemedAccentBarProps {
  className?: string;
}

/**
 * 主题色强调条
 */
export function ThemedAccentBar({ className }: ThemedAccentBarProps) {
  const { theme, hasTheme } = useEventTheme();

  return (
    <div
      className={cn("h-6 w-1 rounded-full", className)}
      style={{
        backgroundColor: hasTheme ? theme?.colors.primary : "hsl(var(--primary))",
      }}
    />
  );
}

// ============================================
// Floating Decorations Component
// ============================================

interface FloatingDecorationsProps {
  className?: string;
}

/**
 * 浮动装饰元素组件
 */
export function FloatingDecorations({ className }: FloatingDecorationsProps) {
  const { decorations, hasTheme } = useEventTheme();

  if (!hasTheme || !decorations?.floatingElements) return null;

  const { type, items, colors, density } = decorations.floatingElements;

  const densityCount = {
    low: 5,
    medium: 10,
    high: 20,
  };

  const count = densityCount[density || "medium"];

  // 生成随机位置的装饰元素
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${4 + Math.random() * 4}s`,
    size: 8 + Math.random() * 16,
    color: colors?.[i % (colors?.length || 1)] || "#ffffff",
    item: items?.[i % (items?.length || 1)],
  }));

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float opacity-30"
          style={{
            left: el.left,
            top: el.top,
            animationDelay: el.delay,
            animationDuration: el.duration,
            width: el.size,
            height: el.size,
            color: el.color,
          }}
        >
          {type === "particles" && (
            <div
              className="h-full w-full rounded-full"
              style={{ backgroundColor: el.color }}
            />
          )}
          {type === "icons" && el.item && (
            <FloatingIcon name={el.item} color={el.color} />
          )}
        </div>
      ))}
    </div>
  );
}

function FloatingIcon({ name, color }: { name: string; color: string }) {
  // 简单的SVG图标映射
  const icons: Record<string, React.ReactNode> = {
    snowflake: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M20 12V22H4V12H2V10H8.5L6 6.5L7.5 5L12 9.5L16.5 5L18 6.5L15.5 10H22V12H20ZM6 12V20H11V12H6ZM13 12V20H18V12H13Z" />
      </svg>
    ),
    ghost: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 2C7.03 2 3 6.03 3 11V22L6 19L9 22L12 19L15 22L18 19L21 22V11C21 6.03 16.97 2 12 2ZM9 11C7.9 11 7 10.1 7 9S7.9 7 9 7 11 7.9 11 9 10.1 11 9 11ZM15 11C13.9 11 13 10.1 13 9S13.9 7 15 7 17 7.9 17 9 16.1 11 15 11Z" />
      </svg>
    ),
    bat: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 4C9 4 6.5 5.5 5 8C3.5 10.5 3 14 4 17C2 17 1 18 1 18S3 20 5 20C6.5 20 7.5 19 8 18L10 16L12 18L14 16L16 18C16.5 19 17.5 20 19 20C21 20 23 18 23 18S22 17 20 17C21 14 20.5 10.5 19 8C17.5 5.5 15 4 12 4Z" />
      </svg>
    ),
    pumpkin: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 2C11 2 10 2.5 9.5 3.5C8 3 6 3.5 5 5C4 7 4 9 5 11C3 11 2 13 2 15C2 18 4 21 8 21C10 21 11 20 12 19C13 20 14 21 16 21C20 21 22 18 22 15C22 13 21 11 19 11C20 9 20 7 19 5C18 3.5 16 3 14.5 3.5C14 2.5 13 2 12 2ZM9 13L10 15H8L9 13ZM15 13L16 15H14L15 13ZM12 16C13 16 14 17 14 17H10C10 17 11 16 12 16Z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
