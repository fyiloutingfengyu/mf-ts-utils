import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import eslint from '@rollup/plugin-eslint';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      json(),
      eslint(),
      babel({
        babelHelpers: 'runtime'
      }),
      terser()
    ],
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.error(warning.message);
    },
    output: [
      {
        file: packageJson.browser,
        format: 'umd',
        name: packageJson.customField.moduleName, // format格式为umd的时候必须设置，将作为全部变量挂在window下
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: 'es',
        name: packageJson.customField.moduleName,
        exports: 'named'
      },
      {
        file: packageJson.main,
        format: 'cjs',
        name: packageJson.customField.moduleName,
        exports: 'named'
      }
    ]
  }
];
