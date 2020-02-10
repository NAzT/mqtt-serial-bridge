const SerialPort = require("serialport");
//const Delimiter = require("@serialport/parser-delimiter");
//const parser = port.pipe(new Delimiter({ delimiter: "\r\n" }));
const CCTalk = require("@serialport/parser-cctalk");
const Buffer = require("safe-buffer").Buffer;

let port = new SerialPort("COM1", { baudRate: 9600 });
const parser = port.pipe(new CCTalk());

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
	let data = message.split(",").map((i) => parseInt(i, 10));
	let packet = new Uint8Array(data);
	//console.log(`message=`, message);
	//console.log(`spl=`, message.split(","));
	//console.log(`data=`, data);
	console.log(`sending: `, data);
	port.write(packet);
});

port.on("open", () => {
	console.log("port opened.");
	const msg = Buffer.from(
		[40, 0, 1, 245, 226]
	);
	port.write(msg);
});

port.on("close", () => {
	console.log("on close.");
});

port.on("error", e => {
	console.log("on error", e);
});

parser.on("data", data => {
	console.log(`Raw: `, data, "Str: ", data.toString());
});
