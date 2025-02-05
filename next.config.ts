import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [ {protocol: 'https',
      hostname: 'cdn.sanity.io',
    },// Add this line
    // domains: ['cdn.sanity.io']]
  ]
  },
};

export default nextConfig;
