import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/main.ts',
    'src/sectors/health.ts',
    'src/sectors/hello-again-rest.ts',
    'src/sectors/hello-mongo.ts',
    'src/sectors/hello-rest.ts'
  ],
  format: ['esm'],
  target: 'node16',
  clean: true,
  splitting: false,
  sourcemap: true,
  dts: true
})
