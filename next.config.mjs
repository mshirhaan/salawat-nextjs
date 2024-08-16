import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  // You can add other Next.js configuration options here
});

export default nextConfig;
