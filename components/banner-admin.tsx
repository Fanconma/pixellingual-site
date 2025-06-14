"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BANNER_THEMES, clearDismissedBanners, type Banner } from "@/data/banners"
import { Settings, RefreshCw, Eye } from "lucide-react"

interface BannerAdminProps {
  onPreview?: (banner: Banner) => void
}

export default function BannerAdmin({ onPreview }: BannerAdminProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    type: "info" as keyof typeof BANNER_THEMES,
    title: "",
    message: "",
    buttonText: "",
    buttonLink: "",
    priority: 5,
    dismissible: true,
    autoHide: false,
    autoHideDelay: 5000,
  })

  const handlePreview = () => {
    const theme = BANNER_THEMES[formData.type]
    const previewBanner: Banner = {
      ...formData,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      borderColor: theme.borderColor,
      icon: theme.icon,
    }

    if (onPreview) {
      onPreview(previewBanner)
    }
  }

  const handleReset = () => {
    clearDismissedBanners()
    window.location.reload()
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="fixed bottom-4 right-4 z-50">
        <Settings className="w-4 h-4 mr-2" />
        横幅管理
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="minecraft-card bg-background p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-xl">横幅管理器</h2>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </div>

        <div className="space-y-4">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">横幅ID</label>
              <Input
                value={formData.id}
                onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
                placeholder="unique-banner-id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">类型</label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value as keyof typeof BANNER_THEMES }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(BANNER_THEMES).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-medium mb-1">标题</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="横幅标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">消息</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="横幅消息内容"
              rows={3}
            />
          </div>

          {/* 按钮设置 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">按钮文本</label>
              <Input
                value={formData.buttonText}
                onChange={(e) => setFormData((prev) => ({ ...prev, buttonText: e.target.value }))}
                placeholder="了解更多"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">按钮链接</label>
              <Input
                value={formData.buttonLink}
                onChange={(e) => setFormData((prev) => ({ ...prev, buttonLink: e.target.value }))}
                placeholder="/link"
              />
            </div>
          </div>

          {/* 高级设置 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">优先级</label>
              <Input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData((prev) => ({ ...prev, priority: Number.parseInt(e.target.value) || 5 }))}
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dismissible"
                  checked={formData.dismissible}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, dismissible: checked as boolean }))}
                />
                <label htmlFor="dismissible" className="text-sm">
                  可关闭
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoHide"
                  checked={formData.autoHide}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, autoHide: checked as boolean }))}
                />
                <label htmlFor="autoHide" className="text-sm">
                  自动隐藏
                </label>
              </div>
            </div>
          </div>

          {formData.autoHide && (
            <div>
              <label className="block text-sm font-medium mb-1">自动隐藏延迟 (毫秒)</label>
              <Input
                type="number"
                value={formData.autoHideDelay}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, autoHideDelay: Number.parseInt(e.target.value) || 5000 }))
                }
                min="1000"
                step="1000"
              />
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handlePreview} className="minecraft-btn">
              <Eye className="w-4 h-4 mr-2" />
              预览
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              重置已关闭
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" className="ml-auto">
              关闭
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
