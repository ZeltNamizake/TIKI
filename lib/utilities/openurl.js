const { spawn } = require("child_process");
const path = require("path");
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const delay = require(path.join(__dirname, "..", "..", "src/functions/delay.js"));

function RunTermuxOpenUrl(url) {
  return new Promise((resolve) => {
    const ps = spawn("termux-open-url", [url], { stdio: "inherit" });
    ps.on("close", async (code) => {
      await clear();
      if (code === 0) {
        console.log(`${colors.green}${unicode.check}${colors.reset} ${url} opened successfully.`);
      } else {
        console.log(`${colors.red}${unicode.close}${colors.reset} Failed to open URL. Exit code: ${code}`);
      }
     resolve();
    });
  });
}

function termuxOpenUrl() {
  return new Promise((resolve) => {
    let status = false;
    const askUrl = async () => {
      console.log(
        `${unicode.web}${colors.cyan}${colors.bold} TIKI - Termux Open URL${colors.reset}`,
      );
      if (status === true) {
        console.log(
          `${colors.red}${unicode.close}${colors.reset} Invalid URL, please try again.`,
        );
      }
      const url = await ask(
        `Enter the URL or type ${colors.red}".exit"${colors.reset} to return.: `,
      );
      const trimmed = url.trim();
      const isValidUrl = (url) => {
        const trimURL = url.trim();
        return (
          (trimURL.startsWith("http://") && trimURL.length > 7) ||
          (trimURL.startsWith("https://") && trimURL.length > 8)
        );
      };
      if (isValidUrl(trimmed)) {
        await RunTermuxOpenUrl(trimmed)
        await delay(800)
        resolve()
      } else if (trimmed === ".exit") {
        await clear();
        console.log(
          `${colors.red}${unicode.close}${colors.reset} Termux Open URL exit. Returning to menu...\n`,
        );
        await delay(800);
        resolve()
      } else {
        await clear();
        status = true;
        askUrl();
      }
    };
    askUrl();
  });
}

module.exports = termuxOpenUrl;
