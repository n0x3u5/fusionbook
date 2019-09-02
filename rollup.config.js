import path from 'path'

import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-generate-html'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import rollupTS from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import postcssCopy from 'postcss-copy'
import typescript from 'typescript'

const NODE_ENV = process.env.NODE_ENV
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = !IS_PROD
const NAME_MID_REACT = IS_PROD ? 'production.min' : 'development'
const NAME_REACT = `react.${NAME_MID_REACT}.js`
const NAME_REACT_DOM = `react-dom.${NAME_MID_REACT}.js`
const PATH_INPUT_FILE = path.join('.', 'src', 'client', 'index.tsx')
const PATH_OUT_DIR = path.join('.', 'dist')
const PATH_OUT_VENDORS = path.join(PATH_OUT_DIR, 'vendors')
const PATH_OUT_FILE = path.join(PATH_OUT_DIR, 'bundle.js')
const PATH_SRC_HTML = path.join('.', 'src', 'client', 'index.html')
const PATH_DEST_HTML = path.join(PATH_OUT_DIR, 'index.html')
const PATH_SRC_REACT = path.join(
  '.',
  'node_modules',
  'react',
  'umd',
  NAME_REACT
)
const PATH_SRC_REACT_DOM = path.join(
  '.',
  'node_modules',
  'react-dom',
  'umd',
  NAME_REACT_DOM
)

export default {
  input: PATH_INPUT_FILE,
  output: {
    file: PATH_OUT_FILE,
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: ['react', 'react-dom'],
  onwarn: msg => { if (!/semantic-ui-react/.test(msg)) console.warn(msg) },
  plugins: [
    resolve(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    commonjs({
      namedExports: { 'react-is': ['isForwardRef'] }
    }),
    postcss({
      extract: true,
      plugins: [
        postcssCopy({
          template: 'assets/[hash].[ext]',
          dest: PATH_OUT_DIR
        })
      ]
    }),
    rollupTS({
      typescript,
      check: IS_DEV,
      clean: IS_DEV,
      objectHashIgnoreUnknownHack: IS_PROD,
      tsconfigOverride: {
        compilerOptions: { jsx: 'react', target: 'ESNext' }
      }
    }),
    html({ filename: PATH_DEST_HTML, template: PATH_SRC_HTML }),
    copy({
      copyOnce: IS_PROD,
      targets: [
        {
          src: PATH_SRC_REACT_DOM,
          dest: PATH_OUT_VENDORS,
          rename: 'react-dom.js'
        },
        { src: PATH_SRC_REACT, dest: PATH_OUT_VENDORS, rename: 'react.js' }
      ]
    })
  ],
  watch: {
    clearScreen: false
  }
}
