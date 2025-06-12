// src/components/WalineComments.tsx
import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import type { WalineInitOptions, WalineInstance } from '@waline/client'; // 引入 Waline 的类型定义

// 定义组件的 props 接口，它继承了 Waline 的初始化选项
// 这样你就可以传递任何 Waline init 函数支持的选项作为 props
interface WalineCommentsProps extends WalineInitOptions {
  serverURL: string; // 明确要求 serverURL，因为它是必需的
  // 你可以在这里添加其他特定的 props，如果你的组件需要
}

const WalineComments: React.FC<WalineCommentsProps> = (props) => {
  // 创建一个 ref 来引用 Waline 将要挂载的 DOM 元素
  const walineContainerRef = useRef<HTMLDivElement>(null);
  // 创建一个 ref 来存储 Waline 实例，以便在组件卸载时进行清理
  const walineInstanceRef = useRef<WalineInstance | null>(null);

  useEffect(() => {
    // 确保 DOM 元素已经存在
    if (!walineContainerRef.current) {
      return;
    }

    // 在重新初始化之前，销毁任何现有的 Waline 实例，
    // 这在 props 变化导致组件重新渲染时很重要
    if (walineInstanceRef.current) {
      walineInstanceRef.current.destroy();
      walineInstanceRef.current = null;
    }

    // 初始化 Waline 评论系统
    // el 选项现在是一个 DOM 元素引用，而不是字符串 ID
    walineInstanceRef.current = init({
      el: walineContainerRef.current,
      ...props, // 将所有传递给 WalineComments 组件的 props 传递给 Waline 的 init 函数
    });

    // 返回一个清理函数，当组件卸载时（或 useEffect 重新运行时）会执行
    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
        walineInstanceRef.current = null;
      }
    };
  }, [props]); // 依赖数组包含 props，意味着当 props 变化时，effect 会重新运行，销毁旧实例并初始化新实例

  return <div ref={walineContainerRef} />;
};

export default WalineComments;