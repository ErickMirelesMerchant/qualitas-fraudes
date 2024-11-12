import CryptoJS from "crypto-js";

const secretKey = "miClaveSecreta123";

export function encryptId(id) {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  return encodeURIComponent(encrypted); // Codifica para URL
}

export function decryptId(encryptedId) {
  try {
    const decoded = decodeURIComponent(encryptedId); // Decodifica de la URL
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error al desencriptar el ID:", error.message);
    return null; // Manejo de error
  }
}
