/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
      },
      reactStrictMode: true,
};

export default nextConfig;
