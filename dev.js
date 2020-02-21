const { spawn } = require("child_process");

const args = process.argv.slice(2)
const scripts = require('./package.json').scripts || {}

const command = scripts.dev ? 'dev' : scripts.serve ? 'serve' : 'start'
args.unshift(command)
args.push('--color') // 确保 stream 输出到终端的时候能显示正确的颜色

const gm = spawn("yarn", args);

gm.stderr.pipe(process.stderr)
gm.stdout.pipe(process.stdout)
