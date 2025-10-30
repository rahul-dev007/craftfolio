/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'onnxruntime-node',
      '@xenova/transformers',
      'pdf-parse',
      'pdfjs-dist',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const ext = Array.isArray(config.externals) ? config.externals : [];
      config.externals = [...ext, 'pdf-parse', 'pdfjs-dist'];
    }
    return config;
  },
};

module.exports = nextConfig;
