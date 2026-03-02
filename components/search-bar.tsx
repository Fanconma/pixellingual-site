"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { debounce } from "@/lib/performance"


interface SearchBarProps {
  onSearch: (query: string) => void
  className?: string
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("")

  // Debounce search to prevent excessive re-renders
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value)
    }, 300),
    [onSearch],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  const handleClear = useCallback(() => {
    setQuery("")
    onSearch("")
  }, [onSearch])

  return (
    <div className={`relative group ${className}`} data-search-input>
      <Input
        type="text"
        placeholder="搜索翻译包..."
        className="pl-11 pr-11 h-12 rounded-xl bg-card/70 backdrop-blur-md border-border/50 text-base font-pixel transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_20px_rgba(93,156,66,0.15)] focus:bg-card/90 placeholder:text-muted-foreground/50"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-focus-within:text-primary" />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

