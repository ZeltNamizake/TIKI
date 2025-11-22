const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { spawn } = require("child_process");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const delay = require(path.join(__dirname, "..", "..", "src/functions/delay.js"));

const colorsDir = path.join(__dirname, "..", "..", "src/colors");
const destColors = path.join(process.env.HOME, ".termux/colors.properties");

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

async function termuxColor() {
  const files = fs
    .readdirSync(colorsDir)
    .filter((f) => fs.lstatSync(path.join(colorsDir, f)).isFile());

  if (files.length === 0) {
    console.log(
      `${colors.red}{unicode.close}${colors.reset} Font file missing.`,
    );
    return;
  }
  console.log(
    `${unicode.color}${colors.bold}${colors.cyan} TIKI — Changed Theme Color Termux${colors.reset}`,
  );
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "file",
      message: "Select Theme Color:",
      choices: files.map((f) => `${f}`),
    },
  ]);

  const srcFile = path.join(colorsDir, answer.file);
  clear();
  try {
    if (!fs.existsSync(destColors)) fs.copyFileSync(srcFile, destColors);
    fs.unlinkSync(destColors);
    fs.copyFileSync(srcFile, destColors);
    console.log(
      `${colors.green}${colors.bold}${unicode.check} Theme successfully changed.${colors.reset}`,
    );
    reloadTermux();
    await delay(1000);
  } catch (err) {
    console.log(
      `${colors.dim}${colors.red}${unicode.close} Failed changed and copy font:\n${err.message}`,
    );
  }
}

module.exports = termuxColor;
