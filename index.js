const { execSync, spawn } = require("child_process");
const fs = require("fs");

if (!fs.existsSync(".git")) {
  console.log("error: 当前工程不含 git");
  process.exit(1);
}

try {
  execSync("which git");
} catch (error) {
  console.log("error: 您的 pc 未安装 git");
  process.exit(1);
}

execSync("git add .");

let msg = process.argv.slice(2).join(" ");

if (!msg) msg = "update";

const gm = spawn("git", ["commit", "-m", msg]);

gm.stdout.on("data", data => process.stdout.write(data));
gm.stderr.on("data", data => process.stderr.write(data));

gm.on("close", code => {
  if (code === 0) {
    const gp = spawn("git", ["push"]);
    gp.stdout.on("data", data => process.stdout.write(data));
    gp.stderr.on("data", data => process.stderr.write(data));
  }
});
