import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/widget.js',
  output: {
    dir: 'public',
    entryFileNames: 'bundle.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    nodeResolve()
  ]
};



