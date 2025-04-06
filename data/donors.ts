export interface Donor {
    id: number
    name: string
    amount: number
    tier: "diamond" | "gold" | "iron"
    message: string
    date: string
    avatar: string
  }
  
  // 捐赠等级信息
  export const TIER_INFO = {
    diamond: {
      icon: "crown",
      color: "text-blue-400",
      bg: "bg-blue-400/20",
      label: "钻石支持者",
      amount: 100,
      benefits: [
        "钻石支持者徽章",
        "支持者列表顶部展示",
        "自定义支持者留言",
        "新翻译包抢先体验",
        "参与未来翻译项目的决策",
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700 border-blue-800",
    },
    gold: {
      icon: "star",
      color: "text-yellow-400",
      bg: "bg-yellow-400/20",
      label: "黄金支持者",
      amount: 50,
      benefits: ["黄金支持者徽章", "支持者列表特别展示", "自定义支持者留言", "新翻译包抢先体验"],
      buttonColor: "bg-yellow-600 hover:bg-yellow-700 border-yellow-800",
      popular: true,
    },
    iron: {
      icon: "shield",
      color: "text-gray-400",
      bg: "bg-gray-400/20",
      label: "铁质支持者",
      amount: 10,
      benefits: ["铁质支持者徽章", "支持者列表展示", "特别鸣谢"],
      buttonColor: "",
    },
  }
  
  // 钻石等级捐赠者
  export const DIAMOND_DONORS: Donor[] = [
    {
      id: 1,
      name: "Steve Miner",
      amount: 100,
      tier: "diamond",
      message: "Keep up the great work! Your translations have helped me enjoy Minecraft so much more.",
      date: "2023-12-15",
      avatar: "/placeholder.svg?height=100&width=100&text=SM",
    },
    {
      id: 5,
      name: "Villager Trader",
      amount: 150,
      tier: "diamond",
      message: "Hmm! (Translation: These translations are worth every emerald!)",
      date: "2023-11-25",
      avatar: "/placeholder.svg?height=100&width=100&text=VT",
    },
    {
      id: 7,
      name: "Dragon Slayer",
      amount: 200,
      tier: "diamond",
      message: "Your translations are as valuable as dragon eggs!",
      date: "2023-10-15",
      avatar: "/placeholder.svg?height=100&width=100&text=DS",
    },
  ]
  
  // 黄金等级捐赠者
  export const GOLD_DONORS: Donor[] = [
    {
      id: 2,
      name: "Alex Builder",
      amount: 50,
      tier: "gold",
      message: "Thank you for making these amazing translations!",
      date: "2023-12-10",
      avatar: "/placeholder.svg?height=100&width=100&text=AB",
    },
    {
      id: 4,
      name: "Enderman",
      amount: 75,
      tier: "gold",
      message: "These translations are teleporting Minecraft to new heights!",
      date: "2023-12-01",
      avatar: "/placeholder.svg?height=100&width=100&text=EM",
    },
    {
      id: 8,
      name: "Redstone Engineer",
      amount: 60,
      tier: "gold",
      message: "Your translations power my Minecraft experience!",
      date: "2023-09-20",
      avatar: "/placeholder.svg?height=100&width=100&text=RE",
    },
    {
      id: 9,
      name: "Ocean Explorer",
      amount: 65,
      tier: "gold",
      message: "Diving into these translations has been amazing!",
      date: "2023-08-15",
      avatar: "/placeholder.svg?height=100&width=100&text=OE",
    },
  ]
  
  // 铁质等级捐赠者
  export const IRON_DONORS: Donor[] = [
    {
      id: 3,
      name: "Creeper Fan",
      amount: 25,
      tier: "iron",
      message: "Boom! Great translations!",
      date: "2023-12-05",
      avatar: "/placeholder.svg?height=100&width=100&text=CF",
    },
    {
      id: 6,
      name: "Zombie Piglin",
      amount: 15,
      tier: "iron",
      message: "Grunt! (Translation: Thanks for the translations!)",
      date: "2023-11-20",
      avatar: "/placeholder.svg?height=100&width=100&text=ZP",
    },
    {
      id: 10,
      name: "Cave Dweller",
      amount: 20,
      tier: "iron",
      message: "Your translations light up my Minecraft world!",
      date: "2023-07-10",
      avatar: "/placeholder.svg?height=100&width=100&text=CD",
    },
    {
      id: 11,
      name: "Sheep Herder",
      amount: 10,
      tier: "iron",
      message: "Baa! (Translation: Love your work!)",
      date: "2023-06-05",
      avatar: "/placeholder.svg?height=100&width=100&text=SH",
    },
    {
      id: 12,
      name: "Chicken Farmer",
      amount: 12,
      tier: "iron",
      message: "Cluck! (Translation: These translations are egg-cellent!)",
      date: "2023-05-01",
      avatar: "/placeholder.svg?height=100&width=100&text=CF",
    },
  ]
  
  // 所有捐赠者
  export const ALL_DONORS = [...DIAMOND_DONORS, ...GOLD_DONORS, ...IRON_DONORS]
  
  