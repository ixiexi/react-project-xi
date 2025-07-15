import { spawn } from 'child_process'
import { workspace } from './workspace.mjs'
import { readFileSync } from 'fs'
import k from 'kleur'

// 获取平台特定的 npm 命令
const getNpmCommand = () => {
    return process.platform === 'win32' ? 'npm.cmd' : 'npm'
}

const getBuildTask = () => {
    const totalBuildTasks = workspace.targetDirs
    let _tasks = totalBuildTasks.filter(task => {
        return process.argv
            .map((arg) => arg.toLowerCase())
            .includes(task.name.toLowerCase())
    })

    return _tasks
}

// const runScript = (scriptName, pkgLocation, args = '') => {
//     const pkgJson = JSON.parse(
//         readFileSync(`${pkgLocation}/package.json`, 'utf-8')
//     )
//     if (pkgJson.scripts && pkgJson.scripts[scriptName]) {
//         spawn('npm', ['run', scriptName, ...args], {
//             stdio: 'inherit',
//             cwd: pkgLocation,
//         })
//     }
// }

const runScript = (scriptName, pkgLocation, args = []) => {
    const pkgJson = JSON.parse(
        readFileSync(`${pkgLocation}/package.json`, 'utf-8')
    )

    if (pkgJson.scripts && pkgJson.scripts[scriptName]) {
        const npm = getNpmCommand()
        const child = spawn(npm, ['run', scriptName, ...args], {
            stdio: 'inherit',
            cwd: pkgLocation,
            shell: true, // 添加 shell 选项
            windowsHide: false // Windows 上显示控制台窗口
        })

        // 添加错误处理
        // child.on('error', (err) => {
        //     console.error(k.red(`❌ ${pkgLocation} 执行失败: ${err.message}`))
        //     process.exit(1)
        // })

        // 添加退出处理
        // child.on('exit', (code) => {
        //     if (code !== 0) {
        //         console.error(k.red(`❌ ${pkgLocation} 构建失败，退出码: ${code}`))
        //         process.exit(code)
        //     }
        // })
    }
}

(() => {
    const buildTasks = getBuildTask()
    if (buildTasks.length === 0) {
        console.log(k.bold().red('构建失败，构建任务为空！'))
        return
    }
    buildTasks.forEach(taskInfo => {
        console.log(k.blue(`[${taskInfo.name}]${k.green('正在构建中')}`));

        // if (taskInfo.name === 'playground') {
        //     runScript('buildWeb', taskInfo.location)
        // } else {
        runScript('build', taskInfo.location)
        // }
    })
})()