import path from 'path'
import postcssCopy from 'postcss-copy'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-generate-html'
import livereload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import rollupTS from 'rollup-plugin-typescript2'
import typescript from 'typescript'

const NODE_ENV = process.env.NODE_ENV
const IS_SERVED = !!process.env.SERVED
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = !IS_PROD
const NAME_MID_REACT = IS_PROD ? 'production.min' : 'development'
const NAME_REACT = `react.${NAME_MID_REACT}.js`
const NAME_REACT_DOM = `react-dom.${NAME_MID_REACT}.js`
const PATH_INPUT_FILE = path.join('.', 'src', 'client', 'index.tsx')
const PATH_OUT_DIR = path.join('.', 'dist')
const PATH_OUT_VENDORS = path.join(PATH_OUT_DIR, 'vendors')
const PATH_OUT_FILE = path.join(PATH_OUT_DIR, 'bundle.js')
const PATH_SRC_DIR = path.join('.', 'src')
const PATH_SRC_HTML = path.join(PATH_SRC_DIR, 'client', 'index.html')
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

const plugins = [
  resolve(),
  replace({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
  commonjs({
    namedExports: { 'react-is': ['isForwardRef'] }
  }),
  postcss({
    extract: true,
    plugins: [
      postcssCopy({ template: 'assets/[hash].[ext]', dest: PATH_OUT_DIR })
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
]

export default {
  input: PATH_INPUT_FILE,
  output: {
    file: PATH_OUT_FILE,
    format: 'iife',
    globals: { react: 'React', 'react-dom': 'ReactDOM' }
  },
  external: ['react', 'react-dom'],
  onwarn: ({ message }) => {
    if (IS_DEV) {
      console.warn(
        '\u001b[1m\u001b[33m',
        `(!) ${message}`,
        '\u001b[39m\u001b[22m'
      )
    }
  },
  plugins: IS_SERVED
    ? plugins.concat([
      serve({ contentBase: PATH_OUT_DIR }),
      livereload({
        exclusions: ['.git', '.svn', '.hg', 'node_modules', '.rpt2_cache']
      })
    ])
    : plugins,
  watch: { clearScreen: false }
}
