const SerialPort = require("serialport");
//const Delimiter = require("@serialport/parser-delimiter");
//const parser = port.pipe(new Delimiter({ delimiter: "\r\n" }));

let port = new SerialPort("COM1", { baudRate: 9600 });

port.on("open", () => {
	console.log("port opened.");
	const msg = Buffer.from(
		[40, 0, 1, 254, 217]);
	port.write(msg);
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
