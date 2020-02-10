const bus = require("ds-cctalk");
const cctalk = new bus();

console.log(new cctalk.CCCommand(1, 2, 245));
