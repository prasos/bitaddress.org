function validatePubKey(pubKeyHex, userAddress) {
    var pubKeyBytes = Crypto.util.hexToBytes(pubKeyHex);
    var pubKeyHash = Bitcoin.Util.sha256ripe160(pubKeyBytes);
    var address = new Bitcoin.Address(pubKeyHash).toString();
    return address == userAddress;
}

// Validates given bitcoin address. Code derived from
// Bitcoin.Address.decodeString and added P2SH support
function validateAddress(addr) {
    try {
	var bytes = Bitcoin.Base58.decode(addr);
    } catch (e) {
	return false; // Invalid character
    }
    var hash = bytes.slice(0, 21);
    var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });

    if (checksum[0] != bytes[21] ||
	checksum[1] != bytes[22] ||
	checksum[2] != bytes[23] ||
	checksum[3] != bytes[24]) {
	return false;
    }

    var version = hash.shift();

    if (version == 0) return true; // P2PKH address
    if (version == 5) return true; // P2SH address
    return false; // Unknown
}

window['validatePubKey'] = validatePubKey;
window['validateAddress'] = validateAddress;
