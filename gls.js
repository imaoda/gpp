const { execSync, spawn } = require("child_process");

module.exports = function () {
  try {
    execSync("which git");
  } catch (error) {
    console.log("error: 您的 pc 未安装 git");
    process.exit(1);
  }

  execSync("git pull --recurse-submodules");
};
