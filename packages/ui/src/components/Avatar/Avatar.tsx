import * as React from "react";

export interface AvatarProps {
  /** 画像URL。指定時は img を描画（alt 必須） */
  src?: string;
  /** 画像の代替テキスト。人物名を入れる */
  alt?: string;
  /** 画像が無いときに表示するイニシャル（1〜2文字） */
  initials?: string;
  /** サイズ。sm=32px / md=40px / lg=48px */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  className = "",
}: AvatarProps) {
  const shape = [
    "inline-flex items-center justify-center rounded-full overflow-hidden",
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return <img src={src} alt={alt} className={`${shape} object-cover`} />;
  }

  return (
    <span
      role="img"
      aria-label={alt || initials || ""}
      className={`${shape} bg-primary-50 text-primary-600 font-medium`}
    >
      {initials}
    </span>
  );
}
