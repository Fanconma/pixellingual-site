"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, SunMoon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Force theme change to take effect
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)

    // Force the theme to apply immediately
    const htmlElement = document.documentElement
    if (newTheme === "dark") {
      htmlElement.classList.add("dark")
      htmlElement.classList.remove("light")
    } else if (newTheme === "light") {
      htmlElement.classList.add("light")
      htmlElement.classList.remove("dark")
    } else {
      // System theme
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (isDarkMode) {
        htmlElement.classList.add("dark")
        htmlElement.classList.remove("light")
      } else {
        htmlElement.classList.add("light")
        htmlElement.classList.remove("dark")
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="animate-fade-in">
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <SunMoon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>明亮</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>夜间</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          <SunMoon className="mr-2 h-4 w-4" />
          <span>系统</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


