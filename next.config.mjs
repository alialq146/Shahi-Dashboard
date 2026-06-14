/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // الخطوط تُحمّل من Google Fonts وقت التشغيل في المتصفح؛
  // نوقف محاولة Next جلبها وقت البناء لتفادي الحاجة لشبكة خارجية أثناء build.
  optimizeFonts: false,
};
export default nextConfig;
