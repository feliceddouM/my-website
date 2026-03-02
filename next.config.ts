import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Fix workspace root detection when there are multiple lockfiles on the system
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
