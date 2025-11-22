const readline = require("readline")
function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input.trim());
    });
  });
}

module.exports = ask
