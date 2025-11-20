import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/widget.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve()
  ]
};


