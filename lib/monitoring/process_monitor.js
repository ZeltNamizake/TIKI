const readline = require("readline");
const { spawn } = require("child_process");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const {enableRawInput, cleanup} = require(path.join(__dirname, "..", "..", "src/functions/key.js"));

function PSMonitor() {
  return new Promise((resolve) => {
    const psmonitor = setInterval(async () => {
      await clear();
      console.log(
        `${unicode.process}${colors.cyan}${colors.bold} TIKI — Process Monitor${colors.reset}`,
      );
      console.log(`${colors.dim}[Stop process - press "q"]${colors.reset}\n`);
      console.log(
        "================================================================",
      );
      const ps = spawn("ps", [
        "-e",
        "-o",
        "pid",
        "-o",
        "%cpu",
        "-o",
        "%mem",
        "-o",
        "cmd",
      ]);
      ps.stdout.pipe(process.stdout);
      ps.on("close", () =>
        console.log(
          "================================================================",
        ),
      );
    }, 2000);

    const onKey = (str, key) => {
      if (key && key.name === "q") {
        clearInterval(psmonitor);
        console.log(
          `\n${colors.red}${unicode.close}${colors.reset} Process Monitor stopped. Returning to menu...\n`,
        );
        cleanup(onKey);
        setTimeout(() => resolve(), 800);
      }
    };

    enableRawInput(onKey);
  });
}

module.exports = PSMonitor;
