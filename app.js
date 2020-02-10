const SerialPort = require("serialport");
//const Delimiter = require("@serialport/parser-delimiter");
//const parser = port.pipe(new Delimiter({ delimiter: "\r\n" }));

let port = new SerialPort("COM1", { baudRate: 9600 });
const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://mqtt.cmmc.io");

client.on("connect", function() {
	client.subscribe("BILL_VALIDATOR", function(err) {
		if (!err) {
		}
	});
});

client.on("message", function(topic, message) {
	message = message.toString();
	console.log(`message=`, message);
	console.log(`spl=`, message.split(","));
	let data = message.split(",").map(parseInt);
	console.log(`data=`, data);
	let packet = Buffer.from(data);
	console.log(packet);
	port.write(packet);
});

port.on("open", () => {
	console.log("port opened.");
	const msg = Buffer.from(
		[
			//40, 0, 1, 254, 217
			40, 0, 1, 245, 226
		]);
	port.write(msg);
});

port.on("close", () => {
	console.log("on close.");
});

port.on("error", e => {
	console.log("on error", e);
});

port.on("data", data => {
	console.log(data);
	console.log(`Recv: `, data.toString());
});
