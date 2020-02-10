const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://mqtt.cmmc.io");
let { checksum } = require("./checksum");

client.on("connect", function() {
	let d = [40, 0, 1, 245];
	let chksum = checksum(d);
	let b = Uint8Array.from([...d, chksum]);
	client.publish("BILL_VALIDATOR", b.join(","));
	client.end();
});
