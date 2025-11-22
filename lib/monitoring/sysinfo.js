const { exec } = require("child_process");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));

function neofetch() {
  return new Promise((resolve) => {
    exec("neofetch", async (error, stdout, stderr) => {
      if (error || stderr) {
        resolve("❌ Neofetch is not available.");
      } else {
        await clear();
        console.log(
          `${unicode.phone}${colors.cyan}${colors.bold} TIKI — System Information${colors.reset}\n`,
        );
        resolve(stdout || "ℹ️ Neofetch did not return output.");
      }
    });
  });
}

module.exports = neofetch;
