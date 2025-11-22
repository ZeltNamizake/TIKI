const readline = require("readline");
const qrcode = require("qrcode-terminal");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask.js"));

async function generateQRCode() {
  await clear();
  const text = await ask(
    `${unicode.qrcode}${colors.bold}${colors.cyan} TIKI — Generated QR Code${colors.reset}\nEnter text or URL to generate QR Code: `,
  );
  await clear();
  console.log(
    `${unicode.qrcode}${colors.bold}${colors.cyan} TIKI — Generated QR Code:\n${colors.reset}`,
  );
  qrcode.generate(text || "https://example.com", { small: true });
  console.log(
    `\n${colors.bold}${colors.green}${unicode.check} QR Code displayed successfully.${colors.reset}\n`,
  );
}

module.exports = generateQRCode;
