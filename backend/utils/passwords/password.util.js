import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);

const KEY_LENGTH = 64;

export const hashPassword = async (plainPassword) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(plainPassword, salt, KEY_LENGTH);
  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (plainPassword, storedPassword) => {
  const [algorithm, salt, hash] = storedPassword.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const derivedKey = await scrypt(plainPassword, salt, KEY_LENGTH);
  const storedKey = Buffer.from(hash, "hex");

  return derivedKey.length === storedKey.length && timingSafeEqual(derivedKey, storedKey);
};
