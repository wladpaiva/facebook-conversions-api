import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}'],
  splitting: false,
  treeshake: false,
  dts: true,
  bundle: false,
  format: ['esm'],
  clean: true,
  minify: true,
  minifyWhitespace: true,
})
