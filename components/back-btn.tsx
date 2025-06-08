"use client"; // 组件必须是客户端组件

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} className="minecraft-btn"
    >
      返回上一页
    </button>
  );
}
