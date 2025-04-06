// lib/afdian.ts
import { Donor } from "@/types/donor";
import md5 from "md5";

export async function fetchDonors(): Promise<Donor[]> {
  const userId = "fa5ea3824a1b11ec9f7052540025c377"; // 移除末尾空格
  const token = process.env.AFDIAN_TOKEN;
  if (!token) {
    throw new Error("AFDIAN_TOKEN is not set");
  }

  const paramsObj = { page: 1, per_page: 100 };
  const paramsStr = JSON.stringify(paramsObj);
  const ts = Math.floor(Date.now() / 1000);
  const kvString = `params${paramsStr}ts${ts}user_id${userId}`;
  const sign = md5(token + kvString);

  // 构造正确的请求体
  const postData = {
    user_id: userId,
    params: paramsStr,
    ts,
    sign,
  };

  const res = await fetch("https://afdian.tv/api/open/query-sponsor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData), // 使用包含所有字段的 postData
    next: { revalidate: 3600 }, // 每小时刷新一次缓存
  });

  const json = await res.json();

//   console.log("Afdian API 原始返回：", JSON.stringify(json, null, 2));
  if (json.ec !== 200) {
    console.error("请求失败:", json.em);
    return [];
  }

  const list = json.data.list as any[];

  return list.map((entry): Donor => ({
    id: entry.user.user_id,
    name: entry.user.name,
    avatar: entry.user.avatar || "/placeholder.svg",
    amount: Number(entry.all_sum_amount),
    date: entry.last_pay_time * 1000, // 转换为时间戳
    message: entry.remark || "",
  }));
}