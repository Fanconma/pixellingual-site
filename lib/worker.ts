// This file will be used as a Web Worker to offload heavy computations

// Function to filter packs based on search query
export function filterPacks(packs: any[], query: string) {
    if (!query) return packs
  
    const lowerQuery = query.toLowerCase()
    return packs.filter(
      (pack) =>
        pack.title.toLowerCase().includes(lowerQuery) ||
        pack.description.toLowerCase().includes(lowerQuery) ||
        pack.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)) ||
        pack.author.toLowerCase().includes(lowerQuery) ||
        pack.studio.toLowerCase().includes(lowerQuery),
    )
  }
  
  // Function to sort packs by various criteria
  export function sortPacks(packs: any[], sortBy: string) {
    switch (sortBy) {
      case "newest":
        return [...packs].sort((a, b) => Number.parseInt(b.createdAt) - Number.parseInt(a.createdAt))
      case "rating":
        return [...packs].sort((a, b) => b.rating - a.rating)
      case "price":
        return [...packs].sort((a, b) => a.price - b.price)
      default:
        return packs
    }
  }
  
  // Listen for messages from the main thread
  self.addEventListener("message", (event) => {
    const { action, data } = event.data
  
    switch (action) {
      case "filter":
        const filteredPacks = filterPacks(data.packs, data.query)
        self.postMessage({ action: "filterResult", data: filteredPacks })
        break
      case "sort":
        const sortedPacks = sortPacks(data.packs, data.sortBy)
        self.postMessage({ action: "sortResult", data: sortedPacks })
        break
      default:
        break
    }
  })
  