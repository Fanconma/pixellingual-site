"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import SearchDialog from "@/components/search-dialog"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "首页", path: "/" },
    { name: "市场", path: "/market" },
    { name: "加入", path: "/join-us" },
    { name: "联系", path: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="PixelLingual Logo" width={200} height={100} className="pixelated" />
          {/* <span className="font-pixel text-lg hidden sm:inline-block">PixelLingual</span> */}
        </Link>

        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "font-pixel text-sm transition-colors hover:text-primary",
                pathname === route.path ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SearchDialog />

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

     {/* Mobile menu with animation */}
     <div
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container py-4 grid gap-4">
          {routes.map((route, index) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "font-pixel text-sm p-2 rounded-md transition-all transform",
                pathname === route.path ? "bg-primary/10 text-primary" : "hover:bg-muted",
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                "transition-all duration-300 ease-in-out",
                `delay-[${index * 50}ms]`,
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

