const  downloadGitReop = require('download-git-repo');
const fs = require('fs')
async function downCode() {
const arg = process.argv.slice(2)
if(!arg[0].includes('-')) {
  console.log('命令使用错误，例如: my-koa-cli -e koa-demo');
  return
}
if(!fs.existsSync(arg[1])) {
  fs.mkdirSync(arg[1])
}
 await downloadGitReop('dingxinwei/koa-ts-template', `./${arg[1]}`, (err) => {
  console.log(err ? '下载失败': '下载成功');
  if(!err) {
    console.log(`cd ${arg[1]}`);
    console.log('npm install');
  }
 })
}
downCode()

module.exports = downCode