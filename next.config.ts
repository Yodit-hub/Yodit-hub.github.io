import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/Yodit-hub.github.io' : '',
  images: {
    unoptimized: true, // GitHub Pagesで画像を使用する場合必要
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: 'export',
//   // GitHub Pages用の設定
//   //basePath: '/Yodit-hub.github.io', // あなたのリポジトリ名を指定 ※開発サーバーでの確認時はbasePathの設定を一時的にコメントアウトする
//   images: {
//     unoptimized: true, // GitHub Pagesで画像を使用する場合必要
//   },
// };

// export default nextConfig;
