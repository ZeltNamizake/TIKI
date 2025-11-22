const readline = require("readline");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask.js"));
const {enableRawInput, cleanup} = require(path.join(__dirname, "..", "..", "src/functions/key.js"));

async function timer(hours = 0, minutes = 0, seconds = 0) {
  await clear();
  console.log(`${unicode.starpoint} Timer Controls:`);
  console.log("  [ p ] Pause / Resume");
  console.log("  [ q ] Stop and return\n");

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let isPaused = false;
  let status = "";

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      process.stdout.write(
        `\r\x1b[K${unicode.timer}${colors.cyan} Timer:${colors.reset} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${status}`,
      );

      if (!isPaused) totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(interval);
        cleanup(onKey);
        process.stdout.write(
          `\r\x1b[K${colors.green}${unicode.check}${colors.reset} Time's up!\n\n`,
        );
        resolve();
      }
    }, 1000);

    const onKey = (str, key) => {
      if (!key) return;

      if (key.name === "q") {
        clearInterval(interval);
        cleanup(onKey);
        process.stdout.write(
          `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Timer stopped. Returning to menu...\n\n`,
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

async function startTimer(status = "") {
  await clear();

  console.log(
    `${unicode.timer}${colors.cyan}${colors.bold} TIKI — Timer${colors.reset}`,
  );
  if (status) {
    console.log(status);
  }
  console.log(
    `Format:\n${colors.dim}HH:MM:SS e.g 01:00:00\nMM:SS e.g, 01:00\nSS e.g, 01 / 1${colors.reset}`,
  );

  const input = (await ask("Enter timer: ")).trim();

  if (!input) {
    const msg = `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Please enter a value.`;
    return startTimer(msg);
  }

  const parts = input.split(":").map((x) => {
    const n = parseInt(x, 10);
    return Number.isNaN(n) ? NaN : n;
  });

  if (parts.some(Number.isNaN)) {
    const msg = `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Invalid format! Please enter numbers only (e.g. 01:00:00)`;
    return startTimer(msg);
  }

  let h = 0,
    m = 0,
    s = 0;
  if (parts.length === 3) [h, m, s] = parts;
  else if (parts.length === 2) [m, s] = parts;
  else if (parts.length === 1) [s] = parts;
  else {
    const msg = `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Invalid format! Too many segments.`;
    return startTimer(msg);
  }

  if (h < 0 || m < 0 || s < 0 || m >= 60 || s >= 60) {
    const msg = `\r\x1b[K${colors.red}${unicode.close}${colors.reset} Invalid time values! Use HH:MM:SS, MM:SS or SS.`;
    return startTimer(msg);
  }

  await timer(h, m, s);
}

module.exports = startTimer;
