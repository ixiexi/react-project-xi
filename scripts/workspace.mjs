import { } from 'node:fs'
import fse from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packagesDir = path.resolve(__dirname, '../packages')
const appsDir = path.resolve(__dirname, '../apps')

const publishPackages = fse.readdirSync(packagesDir)
const publishApps = fse.readdirSync(appsDir)

const packageDirs = publishPackages.map((p) => path.resolve(packagesDir, p))
const appDirs = publishApps.map((p) => path.resolve(appsDir, p))


const appsResult = appDirs.map((name) => {
    return {
        location: '',
        name: ''
    }
})

const pkgDirs = publishPackages.map((name, index) => {
    return {
        location: packageDirs[index],
        name
    }
})

export const workspace = {
    targetDirs: pkgDirs
}
