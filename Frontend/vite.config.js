import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Configuration Constants
const CURRENT_USER = 'Theek237';
const CURRENT_DATE = '2025-01-15 09:06:16';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // Enable babel debugging in development
        babel: {
          plugins: !isProduction ? ['babel-plugin-styled-components'] : [],
        },
      }),
    ],

    // Base configuration
    base: '/',

    // Build configuration
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: isProduction ? 'esbuild' : false,
      sourcemap: !isProduction,
      // Chunk splitting strategy
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'redux-vendor': ['redux', 'react-redux', 'redux-persist'],
          },
        },
      },
      // Performance budgets
      chunkSizeWarningLimit: 1000,
    },

    // Server configuration
    server: {
      port: 3000,
      strictPort: true,
      host: true, // Listen on all addresses
      open: true, // Open browser on server start
      cors: true, // Enable CORS
      proxy: {
        // Proxy configuration for API requests
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Preview configuration
    preview: {
      port: 4173,
      open: true,
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@assets': resolve(__dirname, './src/assets'),
        '@redux': resolve(__dirname, './src/redux'),
      },
    },

    // CSS configuration
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `$env: "${mode}";`,
        },
      },
    },

    // Optimization configuration
    optimizeDeps: {
      include: ['react', 'react-dom', 'redux', 'react-redux', 'redux-persist'],
      exclude: [],
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(CURRENT_DATE),
      __USER__: JSON.stringify(CURRENT_USER),
    },

    // Performance configurations
    esbuild: {
      jsxInject: `import React from 'react'`,
      dropping: isProduction ? ['console', 'debugger'] : [],
    },

    // Development specific configurations
    ...(mode === 'development' && {
      hmr: {
        overlay: true,
      },
      debug: true,
    }),
  };
});