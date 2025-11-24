import CryptoJS from "crypto-js";

export function sha512(text) {
  return CryptoJS.SHA512(text).toString();
}
