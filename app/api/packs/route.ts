import { ALL_PACKS } from "@/data/translation-packs";
import { NextResponse } from "next/server";

export async function GET() {
  // 这将把 ALL_PACKS 数据作为 JSON 响应发送给客户端。
  // 注意：ALL_PACKS 仍然只在服务器端被导入和处理，不会被打包到客户端 JS 中。
  return NextResponse.json(ALL_PACKS);
}