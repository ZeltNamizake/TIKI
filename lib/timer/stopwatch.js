const readline = require("readline");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const {enableRawInput, cleanup} = require(path.join(__dirname, "..", "..", "src/functions/key.js"));

function stopWatch() {
  return new Promise(async (resolve) => {
    await clear();
    console.log(`${unicode.starpoint} Stopwatch Controls:`);
    console.log("  [ p ] Pause / Resume");
    console.log("  [ q ] Stop and return\n");

    let seconds = 0;
    let isPaused = false;
    let status = "";

    const interval = setInterval(() => {
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      let format = `${hrs}:${mins}:${secs}`;

      process.stdout.write(
        `\r\x1b[K${unicode.stopwatch}${colors.bold}${colors.cyan} Stopwatch:${colors.reset} ${format} ${status}`,
      );
      if (!isPaused) seconds++;
    }, 1000);

    const onKey = (str, key) => {
      if (!key) return;

      if (key.name === "q") {
        clearInterval(interval);
        cleanup(onKey);
        process.stdout.write(
          `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Stopwatch stopped. Returning to menu...\n\n`,
        );
        setTimeout(() => resolve(), 800);
      }

      if (key.name === "p") {
        isPaused = !isPaused;
        status = isPaused ? "(Paused)" : "(Resumed)";
        setTimeout(() => {
          status = isPaused ? "(Paused)" : "";
        }, 1000);
      }
    };

    enableRawInput(onKey);
  });
}

module.exports = stopWatch;
