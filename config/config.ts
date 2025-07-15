import { menus } from "./hooks";

export default {
    exportStatic: {},
    nodeModulesTransform: {
        type: 'none', // all
        exclude: []
    },
    history: {
        type: 'hash'
    },
    // 配置额外的Babel插件
    extraBabelPlugins: [
        [
            'babel-plugin-import',//按需引入
            {
                libraryName: '@alifd/next',
                style: false,
            },
            'fusion'
        ]
    ],
    mode: 'site',
    title: 'Xi React Hooks',
    dynamicImport: {},
    manifest: {},
    hash: true,
    alias: {
        xi- hooks: process.cwd() + '/packages/hooks/src/index.ts'
},
resolve: {
    includes: ['docs', 'packages/hooks/src'],
    },
navs: [
    {
        title: '指南',
        path: '/guide'
    },
    {
        title: 'hooks',
        path: '/hooks'
    }
],
    menus: {
    '/': [
        {
            title: '首页',
            path: 'index'
        },
    ],
        '/guide': [
            {
                title: '指南',
                path: '/guide'
            }
        ],
            '/hooks': menus,
    }
}