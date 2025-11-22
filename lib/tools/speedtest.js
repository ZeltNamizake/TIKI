const { exec, spawn } = require("child_process");
const path = require("path");
const readline = require("readline");
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask.js"));
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const {enableRawInput, cleanup} = require(path.join(__dirname, "..", "..", "src/functions/key.js"));

function isPackageInstalled() {
  return new Promise((resolve) => {
    exec(`pkg list-installed speedtest-go`, (error, stdout, stderr) => {
      if (error) {
        resolve(false);
        return;
      }

      if (stdout.toString().includes("installed")) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function runSpeedTest() {
  return new Promise(async (resolve) => {
    console.log(`${unicode.server}${colors.cyan}${colors.bold} TIKI — SpeedTest-Go${colors.reset}`);
    console.log(`${colors.dim}[Stop process - press "q"]${colors.reset}\n`);
    const ps = spawn("speedtest-go", { stdio: "inherit" });
    const onKey = async (str, key) => {
      if (key && key.name === "q") {
        ps.kill();
        await clear();
        console.log(
          `${colors.red}${unicode.close}${colors.reset} SpeedTest stopped. Returning to menu...\n`,
        );
        cleanup(onKey);
        setTimeout(() => resolve(), 1000);
      }
    };
    enableRawInput(onKey);
    ps.on("close", () => {
      cleanup(onKey)
      console.log()
      setTimeout(() => resolve(), 1000);
    });
  });
}

function installSpeedTest() {
  return new Promise((resolve) => {
    const ps = spawn("apt", ["install", "speedtest-go", "-y"], {
      stdio: "inherit",
    });
    ps.on("close", resolve);
  });
}

async function startSpeedTest() {
  if (!(await isPackageInstalled())) {
    const installPkg = (
      await ask(
        `${colors.green}${colors.bold}${unicode.download} Install SpeedTest-Go? (y/n):${colors.reset} `,
      )
    ).toLowerCase();
    if (installPkg === "y") {
      await installSpeedTest();
      await clear();
      await runSpeedTest();
    } else {
      await clear();
      console.log(
        `\r\x1b[K${colors.red}${unicode.close}${colors.reset} SpeedTest-Go not installed.\n`,
      );
    }
  } else {
    await clear();
    await runSpeedTest();
  }
}

module.exports = startSpeedTest;
