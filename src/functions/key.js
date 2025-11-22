const readline = require("readline")

function enableRawInput(onKey) {
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.resume();
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on("keypress", onKey);
}

function cleanup(onKey) {
  process.stdin.removeListener("keypress", onKey);
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdin.pause();
}

module.exports = {
 enableRawInput,
 cleanup
}
