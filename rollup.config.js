import rollupTS from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import html from 'rollup-plugin-fill-html';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss'
import typescript from 'typescript'

export default {
  input: './src/client/index.tsx',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    commonjs({
      namedExports: {
        'react-is': ['isForwardRef']
      }
    }),
    scss(),
    rollupTS({
      typescript,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          jsx: 'react'
        }
      }
    }),
    html({
      template: './src/client/index.html',
      externals: [
        {
          type: 'js',
          file: './node_modules/react/umd/react.development.js',
          pos: 'before'
        },
        {
          type: 'js',
          file: './node_modules/react-dom/umd/react-dom.development.js',
          pos: 'before'
        }
      ]
    })
  ],
  watch: {
    clearScreen: false
  }
}
