const CryptoJS = require("crypto-js");

export function hexPassword(password) {
    return CryptoJS.SHA256(password).toString()
}