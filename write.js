const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://mqtt.cmmc.io");
let { checksum } = require("./checksum");
let CMD = require("./CMD");

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

client.on("connect", async () => {
	let d;
	let b;

	d = [40, 0, 1, CMD.reset_device];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(2000);

	d = [40, 0, 1, CMD.request_software_revision];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);

	d = [40, 0, 1, CMD.simple_poll];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);

	d = [40, 0, 1, CMD.perform_self_check];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);

	d = [40, 2, 1, CMD.modify_inhibit_status, 255, 255];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);

	//
	d = [40, 0, 1, CMD.modify_master_inhibit_status];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);

	d = [40, 0, 1, CMD.read_buffered_bill_events];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(500);
	client.end();
});
