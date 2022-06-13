const downloadGitReop = require("download-git-repo");
const program = require("commander");
const fs = require("fs");
const version =  require('./package.json').version
const Inquirer = require('inquirer');

const mapActions = {
  create: {
    alias: "c",
    description: "create a project",
    examples: ["my-koa-cli create <project-name>"],
  },
  "*": {
    alias: "",
    description: "command not found",
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 配置命令的别名
    .description(mapActions[action].description) // 配置命令对应的描述
    .action(() => {
      if (action === "*") {
        console.log(mapActions[action].description);
      } else {
        const arg = process.argv.slice(3);
        downCode(arg[0]);
      }
    });
});

async function downCode(arg) {
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise a template to create project',
    choices: ['koa-ts-template'],
  });
  
  if (!fs.existsSync(arg)) {
    fs.mkdirSync(arg);
  }
  const gitUserName = 'dingxinwei/'
  await downloadGitReop( gitUserName + repo, `./${arg}`, (err) => {
    console.log(err ? "下载失败" : "下载成功");
    if (!err) {
      console.log(`cd ${arg}\nnpm install\nnpm start`);
    }
  });
}

// 监听用户的help 事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});

program.version(version).parse(process.argv);