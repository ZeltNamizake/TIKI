const path = require("path");

module.exports = {
  tools: {
    myIp: require(path.join(__dirname, "tools/myip")),
    startSpeedTest: require(path.join(__dirname, "tools/speedtest")),
    generateQRCode: require(path.join(__dirname, "tools/qrcode")),
    httpHeaderResponse: require(path.join(__dirname, "tools/http_header"))
  },
  monitoring: {
    PSMonitor: require(path.join(__dirname, "monitoring/process_monitor")),
    neofetch: require(path.join(__dirname, "monitoring/sysinfo")),
  },
  utilities: {
    termuxColor: require(path.join(__dirname, "utilities/termux_color")),
    termuxFont: require(path.join(__dirname, "utilities/termux_font")),
    terminalImagePrompt: require(path.join(__dirname, "utilities/terminal_image")),
    termuxOpenUrl: require(path.join(__dirname, "utilities/openurl"))
  },
  timer: {
    stopWatch: require(path.join(__dirname, "timer/stopwatch")),
    startTimer: require(path.join(__dirname, "timer/timer")),
  }
};

