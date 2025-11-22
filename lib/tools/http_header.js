const path = require("path");
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask"));
const unicode = require(
  path.join(__dirname, "..", "..", "src/functions/unicode"),
);
const colors = require(
  path.join(__dirname, "..", "..", "src/functions/colors"),
);
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear"));
const { spawn } = require("child_process");

async function httpHeaderResponse() {
  await clear();
  console.log(
    `${unicode.web} ${colors.cyan}${colors.bold}TIKI — HTTP Header Response${colors.reset}`,
  );
  return new Promise(async (resolve) => {
    let target = await ask(`Enter Target URL: `);
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = `https://${target}`;
    }

    const child = spawn("curl", ["-I", target], { stdio: "inherit" });
    child.on("close", resolve);
  });
}

module.exports = httpHeaderResponse;
