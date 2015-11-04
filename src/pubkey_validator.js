function validatePubKey(pubKeyHex, userAddress) {
    var pubKeyBytes = Crypto.util.hexToBytes(pubKeyHex);
    var pubKeyHash = Bitcoin.Util.sha256ripe160(pubKeyBytes);
    var address = new Bitcoin.Address(pubKeyHash).toString();
    return address == userAddress;
}

function validateAddress(addr) {
    try {
	Bitcoin.Address.decodeString(addr);
	return true;
    } catch (e) {
	return false;
    }
}

window['validatePubKey'] = validatePubKey;
window['validateAddress'] = validateAddress;
