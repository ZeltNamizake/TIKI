const fs = require("fs");
const inquirer = require("inquirer");
const terminalImage = require("terminal-image");
const path = require("path");

// --- Source ----
const unicode = require(__dirname + "/src/functions/unicode.js");
const clear = require(__dirname + "/src/functions/clear.js");

// --- Library ---
const lib = require(__dirname + "/lib/");

// ---- Assets ----
const icon = __dirname + "/assets/icon.png";

async function showIcon() {
  await clear();
  console.log(await terminalImage.file(icon));
  console.log("Welcome to menu TIKI 👋");
}

class Tiki {
  async main() {
    while (true) {
      const mainMenu = await inquirer.prompt([
        {
          type: "list",
          name: "menu",
          message: "Select menu:",
          choices: [
            `${unicode.phone} System Info (Neofetch)`,
            `${unicode.ip} MyIP`,
            `${unicode.qrcode} Generate QRCode`,
            `${unicode.process} Process Monitor`,
            `${unicode.image} Terminal Image`,
            `${unicode.timer} Timer`,
            `${unicode.stopwatch} Stopwatch`,
            `${unicode.font} Termux Font`,
            `${unicode.color} Termux Color`,
            `${unicode.server} SpeedTest`,
            `${unicode.web} Open URL`,
            `${unicode.web} HTTP Header Response`,
            `${unicode.exit} Exit`,
          ],
        },
      ]);

      await clear();

      switch (mainMenu.menu) {
        case `${unicode.phone} System Info (Neofetch)`:
          await this.sysinfo();
          break;

        case `${unicode.ip} MyIP`:
          await this.myip();
          break;

        case `${unicode.qrcode} Generate QRCode`:
          await this.qrcode();
          break;

        case `${unicode.process} Process Monitor`:
          await this.psmonitor();
          break;

        case `${unicode.image} Terminal Image`:
          await this.terminalImage();
          break;

        case `${unicode.timer} Timer`:
          await this.timer();
          break;

        case `${unicode.stopwatch} Stopwatch`:
          await this.stopwatch();
          break;

        case `${unicode.font} Termux Font`:
          await this.termuxfont();
          break;

        case `${unicode.color} Termux Color`:
          await this.termuxcolor();
          break;

        case `${unicode.server} SpeedTest`:
          await this.speedtest();
          break;

        case `${unicode.web} Open URL`:
          await this.openurl();
          break;

        case `${unicode.web} HTTP Header Response`:
          await this.httpheader();
          break;

        case `${unicode.exit} Exit`:
          console.log("Goodbye👋!");
          process.exit(0);
      }
    }
  }

  async sysinfo() {
    const res = await lib.monitoring.neofetch();
    console.log(res);
  }

  async myip() {
    const res = await lib.tools.myIp();
    console.log(res);
  }

  async qrcode() {
    await lib.tools.generateQRCode();
  }

  async psmonitor() {
    await lib.monitoring.PSMonitor();
  }

  async terminalImage() {
    await lib.utilities.terminalImagePrompt();
  }

  async timer() {
    await lib.timer.startTimer();
  }

  async stopwatch() {
    await lib.timer.stopWatch();
  }

  async termuxfont() {
    await lib.utilities.termuxFont();
  }

  async termuxcolor() {
    await lib.utilities.termuxColor();
  }

  async speedtest() {
    await lib.tools.startSpeedTest();
  }
  async openurl() {
    await lib.utilities.termuxOpenUrl();
  }
  async httpheader() {
    await lib.tools.httpHeaderResponse();
  }
}

async function main() {
  await showIcon();
  new Tiki().main();
}
main();
