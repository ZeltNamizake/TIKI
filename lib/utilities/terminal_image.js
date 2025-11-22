const readline = require("readline");
const terminalImage = require("terminal-image");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));
const ask = require(path.join(__dirname, "..", "..", "src/functions/ask.js"));

async function terminalImagePrompt() {
  await clear();
  console.log(
    `${unicode.image}${colors.cyan}${colors.bold} TIKI — Terminal Image Viewer${colors.reset}\n`,
  );

  let pathFile = "";

  while (!pathFile) {
    pathFile = await ask(`Enter image file path | (.exit) return menu: `);
    if (!pathFile) {
      console.log(
        `${colors.red}${unicode.close} File path cannot be empty!${colors.reset}\n`,
      );
    }
  }

  if (pathFile === ".exit") {
    await ask("[Process completed - press Enter]");
    await clear();
    console.log(
      `${colors.bold}${colors.green}${unicode.check} Exited TIKI successfully.${colors.reset}`,
    );
    return;
  }

  const customSize = await ask(`Custom size? (y/n):`);

  try {
    await clear();
    console.log(
      `${unicode.image}${colors.cyan}${colors.bold} TIKI — Generated Image${colors.reset}\n`,
    );

    if (customSize.toLowerCase() === "y") {
      const width = parseInt(
        await ask(`Enter image width ${colors.dim}(e.g., 50)${colors.reset}: `),
        10,
      );
      const height = parseInt(
        await ask(
          `Enter image height ${colors.dim}(e.g., 30)${colors.reset}: `,
        ),
        10,
      );
      console.log(
        "\n" + (await terminalImage.file(pathFile, { width, height })),
      );
    } else {
      console.log("\n" + (await terminalImage.file(pathFile)));
    }

    console.log(
      `\n${colors.bold}${colors.green}${unicode.check} Image displayed successfully.${colors.reset}\n`,
    );
  } catch (err) {
    console.error(
      `\n${colors.red}${unicode.close} An error occurred: ${colors.reset}${err.message}\n`,
    );
    await ask(`${colors.yellow}Press Enter to retry...${colors.reset}`);
    await terminalImagePrompt();
  }
}

module.exports = terminalImagePrompt;
