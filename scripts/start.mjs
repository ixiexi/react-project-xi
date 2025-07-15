import { workspace } from "./workspace.mjs";
import k from 'kleur'
import { readFileSync } from 'fs'
import { spawn } from 'child_process'
import process from 'node:process';


// 获取平台特定的 npm 命令
const getNpmCommand = () => {
    return process.platform === 'win32' ? 'npm.cmd' : 'npm'
}

const { targetDirs } = workspace

let flag = false
const runScript = (scriptName, pkgLocation, args = []) => {
    const pkgJson = JSON.parse(
        readFileSync(`${pkgLocation}/package.json`, 'utf-8')
    )

    if (pkgJson.scripts && pkgJson.scripts[scriptName]) {
        const npm = getNpmCommand()
        spawn(npm, ['run', scriptName, ...args], {
            stdio: 'inherit',
            cwd: pkgLocation,
            shell: true, // 添加 shell 选项
            windowsHide: false // Windows 上显示控制台窗口
        })
    }
}

for (let i = 0; i < targetDirs.length; i++) {
    if (
        process.argv.some(
            arg => arg.toLowerCase() === targetDirs[i].name.toLowerCase()
        )
    ) {
        flag = true
        console.log(k.blue(`[${targetDirs[i].name}]${k.green('正在启动中')}`));
        runScript('start', targetDirs[i].location)
    }
}


