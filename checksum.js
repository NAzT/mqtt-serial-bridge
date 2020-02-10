const checksum = (buffer) => {
	let sum = 0;
	for (let i = 0; i < (buffer.length); ++i) {
		sum += (buffer[i]);
	}
	return (256 - (sum % 256));
};

module.exports = {
	checksum
};
