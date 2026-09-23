import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
base: command === 'build' ? '/cryptonations-redux/' : '/',
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true
  },

  server: {
    hmr: true,
    cors: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
      hashPrefix: 'prefix'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },

  resolve: {
    alias: {
      '@': '/src',
      components: '/src/components',
      assets: '/src/assets',
      lib: '/src/lib',
      hooks: '/src/hooks',
      utils: '/src/utils'
    }
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  plugins: [react()]
}))