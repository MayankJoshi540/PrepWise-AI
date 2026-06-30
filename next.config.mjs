/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },

  serverExternalPackages: ["@prisma/client"],

  // Allow your ngrok URL to access Next.js development resources
  allowedDevOrigins: [
    "https://harpist-boring-overtly.ngrok-free.dev",
    "harpist-boring-overtly.ngrok-free.dev",
  ],
};

export default nextConfig;