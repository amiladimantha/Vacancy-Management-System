import CryptoJS from "crypto-js";

const Encryption = {
  encrypt: (text) => {
    const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(text),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString();
  }
};

export default Encryption;
