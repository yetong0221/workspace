/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        macaron: {
          yellow:  '#FEF7CD',   // 柔和黄
          purple:  '#E5DEFF',   // 薰衣草紫
          blue:    '#D3E4FD',   // 天蓝色
          pink:    '#FFDEE2',   // 柔和粉
          mint:    '#D3F8E2',   // 薄荷绿
          peach:   '#FFE5D0',   // 蜜桃橙
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
