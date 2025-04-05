"use client"

import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchDialog() {
  const router = useRouter()

  const handleClick = () => {
    // Navigate to the market page with a flag to focus the search
    router.push("/market")

    // After navigation, scroll to the search input
    setTimeout(() => {
      const searchInput = document.querySelector("[data-search-input]")
      if (searchInput) {
        searchInput.scrollIntoView({ behavior: "smooth" })
        // Focus the input
        const inputElement = searchInput.querySelector("input")
        if (inputElement) {
          inputElement.focus()
        }
      }
    }, 100)
  }

  return (
    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleClick}>
      <Search className="h-5 w-5" />
      <span className="sr-only">搜索地图</span>
    </Button>
  )
}

