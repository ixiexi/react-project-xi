import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import cleaner from 'rollup-plugin-cleaner'
import dts from 'rollup-plugin-dts'
import { globSync } from 'glob'

const hookEntries = globSync('src/use*/index.ts').reduce((entries, file) => {
    const name = file.replace('src/', '').replace('/index.ts', '')
    entries[`${name}/index`] = file
    return entries
}, {})

export default [
    {
        // input 打包
        input: {
            index: 'src/index.ts', // 统一入口
            ...hookEntries // 分入口
        },
        output: [
            // lib
            // es
            {
                dir: 'lib',
                format: 'cjs',
                exports: 'named',
                // sourcemap:true
                preserveModules: true, // 保持目录结构
                preserveModulesRoot: 'src', // 保持目录结构
                entryFileNames: '[name].js'
            },
            {
                dir: 'es',
                format: 'esm',
                preserveModules: true, // 保持目录结构
                preserveModulesRoot: 'src', // 保持目录结构
                entryFileNames: '[name].js'
            }
        ],
        plugins: [
            cleaner({
                targets: ['./lib/', './es/']
            }),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            terser(),
        ],
        external: ['react'],
    },
    {
        // 类型声明打包
        input: {
            index: 'src/index.ts',
            ...hookEntries
        },
        output: [{
            dir: 'lib',
            entryFileNames: '[name].d.ts',
            format: 'lib',
            preserveModules: true
        }],
        plugins: [dts()]
    },
    {
        // dist cdn资源打包
        // 不允许文件分割 umd iife 打包为单文件
        input: {
            index: 'src/index.ts',
        },
        output: [
            {
                dir: 'dist',
                format: 'umd',
                name: 'XiHooks', // antd
            },

        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
            }),
            terser(),
        ]
    }
]
