const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { spawn } = require("child_process");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const delay = require(path.join(__dirname, "..", "..", "src/functions/delay.js"));

const fontsDir = path.join(__dirname, "..", "..", "src/fonts");
const destFont = path.join(process.env.HOME, ".termux/font.ttf");

function reloadTermux() {
  const cmd = "am";
  const args = [
    "broadcast",
    "--user",
    "0",
    "-a",
    "com.termux.app.reload_style",
    "com.termux",
  ];
  spawn(cmd, args, { stdio: "ignore", detached: true });
}

async function termuxFont() {
  const files = fs
    .readdirSync(fontsDir)
    .filter((f) => fs.lstatSync(path.join(fontsDir, f)).isFile());

  if (files.length === 0) {
    console.log(
      `${colors.red}{unicode.close}${colors.reset} Font file missing.`,
    );
    return;
  }
  console.log(
    `${unicode.font}${colors.bold}${colors.cyan} TIKI — Changed Termux Font${colors.reset}`,
  );
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "file",
      message: "Select Font:",
      choices: files.map((f) => `${f.replace(".ttf", "")}`),
    },
  ]);

  const srcFile = path.join(fontsDir, answer.file + ".ttf");
  clear();
  try {
    if (!fs.existsSync(destFont)) fs.copyFileSync(srcFile, destFont);
    fs.unlinkSync(destFont);
    fs.copyFileSync(srcFile, destFont);
    console.log(
      `${colors.green}${colors.bold}${unicode.check} Font successfully changed.${colors.reset}`,
    );
    reloadTermux();
    await delay(1000);
  } catch (err) {
    console.log(
      `${colors.dim}${colors.red}${unicode.close} Failed changed and copy font:\n${err.message}`,
    );
  }
}

module.exports = termuxFont;
