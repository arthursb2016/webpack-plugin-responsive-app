import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.mjs',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  ],
  external: ['responsive-app', 'webpack'],
  plugins: [
    typescript(),
    json(),
    resolve(),
    commonjs()
  ]
}