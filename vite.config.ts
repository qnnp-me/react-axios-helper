import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  define: {
    'process.env': process.env
  },
  build: {
    lib: {
      formats: ['es'],
      entry: './src/index.ts',
      fileName: () => {
        return 'index.mjs'
      },
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'axios'],
      output: {
        globals: {},
      },
    },
  }
})
