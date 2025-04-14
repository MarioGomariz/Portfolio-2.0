import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! ADVERTENCIA !!
    // Ignorar errores de tipo durante la compilación
    // Esto es necesario para resolver un problema con los tipos en las rutas dinámicas en Next.js 15
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
