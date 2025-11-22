const http = require("http");
const path = require("path");
const colors = require(path.join(__dirname, "..", "..", "src/functions/colors.js"));
const unicode = require(path.join(__dirname, "..", "..", "src/functions/unicode.js"));
const clear = require(path.join(__dirname, "..", "..", "src/functions/clear.js"));

function myIp() {
  return new Promise((resolve) => {
    http
      .get("http://ip-api.com/json/", (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          try {
            await clear();
            console.log(
              `${unicode.ip}${colors.cyan}${colors.bold} TIKI — My IP Address${colors.reset}\n`,
            );
            const json = JSON.parse(data);
            resolve(`[•] IP        :  ${json.query}
[•] ISP       :  ${json.isp}
                 ${json.as}
[•] Location  :  ${json.city}, ${json.regionName}, ${json.country}
[•] Timezone  :  ${json.timezone}
`);
          } catch (e) {
            resolve(e.message);
          }
        });
        res.on("error", (err) => resolve(err.message));
      })
      .on("error", (err) => resolve(err.message));
  });
}

module.exports = myIp;
