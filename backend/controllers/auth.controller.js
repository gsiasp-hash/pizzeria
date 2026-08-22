import "dotenv/config";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";
import { hashPassword, verifyPassword } from "../utils/passwords/password.util.js";

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    if (!(await verifyPassword(password, user.password))) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const payload = { email, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie("token", token, COOKIE_OPTIONS);
    return res.json({ email });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

const register = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const user = await authModel.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = { email, password: hashedPassword, id: nanoid() };
    await authModel.addUser(newUser);

    const payload = { email, id: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie("token", token, COOKIE_OPTIONS);
    return res.json({ email });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

const logout = (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: COOKIE_OPTIONS.sameSite,
    secure: COOKIE_OPTIONS.secure,
  });
  return res.json({ message: "Sesión cerrada" });
};

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await authModel.getUserByEmail(email);
    return res.json({ email, id: user.id });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const authController = {
  login,
  register,
  logout,
  me,
};
