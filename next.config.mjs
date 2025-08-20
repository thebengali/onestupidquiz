import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(process.cwd(), 'components');
    config.resolve.alias['@'] = process.cwd();
    return config;
  },
};

export default nextConfig;
