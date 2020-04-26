// 原生node模块
let path = require("path");
let process = require("process");
let { execSync, exec } = require("child_process");

let prefix = process.argv[2] || "b";

let gitLogCmd = 'git log --pretty=format:"%h %s"';
let msgBuf;
let messages;
// https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2
// let gitLog = 'git log  --pretty=format:"%h %s" `git describe --tags --abbrev=0`..HEAD';

msgBuf = execSync(gitLogCmd);
messages = msgBuf.toString("utf8").replace(/[\'\"\\\/\b\f\n\r\t]/g, "");
messages = messages.replace(/\n/g, "");

// 获取用户
let updateUserBuf;
let updateUser;
let gitConfigName = "git config user.name";
try {
  updateUserBuf = execSync(gitConfigName);
} catch (e) {
  console.log(`查看git config user.name： ${e}`);
  return;
}
updateUser = updateUserBuf.toString("utf8").replace(/\n/g, "").split('@')[0];

// tag
let flag = new Date(Date.now() + 28800000)
  .toISOString()
  .replace(/T/, "")
  .replace(/\..+/, "")
  .replace(/-/g, "")
  .replace(/:/g, "")
  .slice(0, 12);
let tagName = `${prefix}-${flag}-${updateUser}`;
let gitTag = `git tag -a ${tagName} -m '${messages.slice(0, 80)}'`;
execSync(gitTag);
let gitPush = `git push origin ${tagName}`;
exec(gitPush, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error) {
    console.error(error);
  } else {
    remind();
  }
});

function remind() {
  // vizion.analyze(
  //   {
  //     folder: ".",
  //   },
  //   (err, meta) => {
  //     if (err) throw new Error(err);
  //     // console.log(meta);
  //     // https://docs.npmjs.com/files/package.json#repository
  //     let url = meta.url || pkg.repository.url || pkg.repository;
  //     if (typeof url !== "string") {
  //       url = "<项目远程地址>";
  //     }
  //     let repository = util.formatURL(url);
  //     let tagLink = `${repository}/tags/${tagName}`;
  //     console.log("变动历史：");
  //     console.log(messages);
  //     console.log("待上线的tag为：");
  //     console.log(tagName);
  //     console.log("发布tag的连接为：");
  //     console.log(tagLink);
  //   }
  // );
}
