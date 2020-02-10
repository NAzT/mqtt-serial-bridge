const SerialPort = require("serialport");
//const Delimiter = require("@serialport/parser-delimiter");

let port = new SerialPort("COM1", { baudRate: 9600 });
const parser = port.pipe(new Delimiter({ delimiter: "\r\n" }));

port.on("open", () => {
	console.log("port opened.");
});

port.on("close", () => {
	console.log("on close.");
});

port.on("error", e => {
	console.log("on error", e);
});

port.on("data", data => {
	console.log(`Recv: `, data);
});