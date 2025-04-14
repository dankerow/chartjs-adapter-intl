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
      {
        input: './src/index',
        outDir: 'dist',
        name: 'chartjs-adapter-intl'
      }
    ],
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
      output: {
        exports: 'auto',
        banner,
        indent: false,
        globals,
        format: 'esm'
      }
    },
    externals
  },
  {
    entries: [
      {
        input: './src/index',
        outDir: 'dist',
        name: 'chartjs-adapter-intl.umd.min'
      }
    ],
    clean: true,
    rollup: {
      esbuild: {
        minify: true
      },
      output: {
        format: 'umd',
        indent: false,
        banner,
        globals,
        name: 'chartjs-adapter-intl',
        sourcemap: true
      }
    },
    externals
  }
])