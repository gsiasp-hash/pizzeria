import { readFile, writeFile } from "node:fs/promises";
import { hashPassword } from "../utils/passwords/password.util.js";

const FILE = new URL("../db/users.json", import.meta.url);

const users = JSON.parse(await readFile(FILE, "utf-8"));

let migrated = 0;
const updated = await Promise.all(
  users.map(async (user) => {
    if (user.password?.startsWith("scrypt:")) return user;
    migrated++;
    return { ...user, password: await hashPassword(user.password) };
  }),
);

await writeFile(FILE, JSON.stringify(updated, null, 2));
console.log(`Migrados ${migrated} de ${users.length} usuarios a hash scrypt.`);
