import { defineBuildConfig } from 'unbuild'
import { readFileSync } from 'node:fs'

const { name, version, homepage, license } = JSON.parse(readFileSync('./package.json').toString())

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${new Date().getFullYear()} chartjs-adapter-intl Contributors
 * Released under the ${license} license
 */`

const globals = { 'chart.js': 'Chart' }
const externals = ['chart.js']

export default defineBuildConfig([
  {
    entries: [
      './src/index'
    ],

    rollup: {
      output: {
        dir: 'dist',
        entryFileNames: 'chartjs-adapter-intl.esm.js',
        format: 'esm',
        indent: false,
        globals
      }
    },

    externals
  },
  {
    entries: [
      './src/index'
    ],

    rollup: {
      output: {
        dir: 'dist',
        entryFileNames: 'chartjs-adapter-intl.umd.js',
        format: 'umd',
        indent: false,
        globals
      }
    },

    externals
  },
  {
    entries: [
      './src/index'
    ],

    rollup: {
      esbuild: {
        minify: true
      },
      output: {
        dir: 'dist',
        entryFileNames: 'chartjs-adapter-intl.umd.min.js',
        format: 'umd',
        indent: false,
        banner,
        globals
      }
    },

    externals
  }
]);
