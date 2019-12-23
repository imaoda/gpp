const { execSync, spawn } = require("child_process");
const fs = require("fs");

module.exports = function (needToPush, needAddMsg) {
  // if (!fs.existsSync(".git")) {
  //   console.log("error: 当前工程不含 git");
  //   process.exit(1);
  // }
  
  try {
    execSync("which git");
  } catch (error) {
    console.log("error: 您的 pc 未安装 git");
    process.exit(1);
  }
  
  execSync("git add .");
  
  let msg = process.argv.slice(2).join(" ");
  
  if (!msg) msg = "update";

  if (needAddMsg) {
    if(!msg.match(/^(feat|fix|bug|docs|style|merge|test)/gim))
    msg = 'feat: ' + msg
  }
  
  const gm = spawn("git", ["commit", "-m", msg]);
  
  gm.stderr.pipe(process.stderr)
  gm.stdout.pipe(process.stdout)
  
  gm.on("close", code => {
    if (code === 0 && needToPush) {
      const gp = spawn("git", ["push"]);
      gp.stderr.pipe(process.stderr)
      gp.stdout.pipe(process.stdout)
    }
  });
}


