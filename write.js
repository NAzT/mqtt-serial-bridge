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

	d = [40, 0, 1, CMD.simple_poll];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 0, 1, CMD.reset_device];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(3000);

	d = [40, 0, 1, CMD.request_software_revision];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 0, 1, CMD.perform_self_check];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 2, 1, CMD.modify_inhibit_status, 255, 255];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 1, 1, CMD.modify_master_inhibit_status, 1];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 0, 1, CMD.request_variable_set];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 1, 1, CMD.request_bill_id, 1];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(50);

	d = [40, 1, 1, CMD.request_bill_id, 2];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(200);

	d = [40, 1, 1, CMD.request_bill_id, 3];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(200);

	d = [40, 1, 1, CMD.request_bill_id, 4];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(200);

	d = [40, 1, 1, CMD.request_bill_id, 5];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(200);

	d = [40, 0, 1, CMD.request_inhibit_status];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	//
	////
	// inhibit on
	d = [40, 2, 1, CMD.modify_inhibit_status, 0, 0];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 2, 1, CMD.modify_inhibit_status, 255, 255];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	d = [40, 0, 1, CMD.read_buffered_credit_or_error_codes];
	b = Uint8Array.from([...d, checksum(d)]);
	await client.publish("BILL_VALIDATOR", b.join(","));
	await timeout(1000);

	//// inhibit off
	//d = [40, 2, 1, CMD.modify_master_inhibit_status, 255,255];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);

	//d = [40, 0, 1, CMD.read_buffered_bill_events];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.enable_hopper];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.request_thermistor_reading];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 1, 1, CMD.test_lamps, 1];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.request_coin_position];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 1, 1, CMD.test_lamps, 0xff];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 1, 1, CMD.test_output_lines, 0xff];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.read_buffered_bill_events];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.request_money_in];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	//
	//d = [40, 0, 1, CMD.request_money_out];
	//b = Uint8Array.from([...d, checksum(d)]);
	//await client.publish("BILL_VALIDATOR", b.join(","));
	//await timeout(1000);
	client.end();
});
