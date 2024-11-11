import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages用の設定
  basePath: '/Yodit-hub.github.io', // あなたのリポジトリ名を指定
  images: {
    unoptimized: true, // GitHub Pagesで画像を使用する場合必要
  },
};

export default nextConfig;