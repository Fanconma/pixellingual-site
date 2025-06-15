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
    <div className={`relative ${className}`} data-search-input>
      <Input
        type="text"
        placeholder="搜索翻译包..."
        className="pl-10 pr-10"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

