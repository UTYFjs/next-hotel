/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phadxjkikilymxurvozf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
  // output: 'export', //for deploy SSG site - after build save website to 'out' folder, all assets - static
};

export default nextConfig;
