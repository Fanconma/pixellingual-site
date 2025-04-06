export interface Donor {
  id: number
  name: string
  amount: number
  message: string
  date: string
  avatar: string
}

// 赞助信息
export const SPONSOR_INFO = {
  label: "社区支持者",
  icon: "heart",
  color: "text-primary",
  bg: "bg-primary/20",
  benefits: ["支持者徽章", "支持者列表展示", "自定义支持者留言", "新翻译包抢先体验", "参与未来翻译项目的决策"],
  buttonColor: "bg-primary hover:bg-primary/90 border-primary/80",
}

// 所有赞助者（合并并按金额排序）
export const ALL_DONORS: Donor[] = [
  {
    id: 7,
    name: "Dragon Slayer",
    amount: 200,
    message: "Your translations are as valuable as dragon eggs!",
    date: "2023-10-15",
    avatar: "/placeholder.svg?height=100&width=100&text=DS",
  }
].sort((a, b) => b.amount - a.amount) // 按金额从高到低排序

// 获取前N个赞助者
export function getTopDonors(count: number): Donor[] {
  return ALL_DONORS.slice(0, count)
}

// 获取特定金额以上的赞助者
export function getDonorsAboveAmount(minAmount: number): Donor[] {
  return ALL_DONORS.filter((donor) => donor.amount >= minAmount)
}

