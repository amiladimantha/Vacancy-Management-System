import CryptoJS from "crypto-js";

const Decryption = (password) => {
  // decrypt the password
  const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
  const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
  const decryptedPassword = CryptoJS.AES.decrypt(
    password,
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString(CryptoJS.enc.Utf8);

  return decryptedPassword;
};

export default Decryption;