const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const err = new Error("Email & Password wajib diisi");
        err.status = 400;
        throw err;
      }

      const user = await User.findOne({ where: { email, is_deleted: false } });
      if (!user) {
        const err = new Error("Email atau Password salah");
        err.status = 401;
        throw err;
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        const err = new Error("Email atau password salah");
        err.status = 401;
        throw err;
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const userSafe = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.json({ token, user: userSafe });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        const err = new Error("Nama, email, dan password wajib diisi");
        err.status = 400;
        throw err;
      }

      const existingUser = await User.findOne({
        where: { email, is_deleted: false },
      });
      if (existingUser) {
        const err = new Error("Email sudah terdaftar");
        err.status = 409;
        throw err;
      }

      const newUser = await User.create({
        name,
        email,
        password, // hashing udah di model lewat hook
        role,
        is_deleted: false,
      });

      const userSafe = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };

      res.status(201).json({ message: "Registrasi berhasil", user: userSafe });
    } catch (err) {
      next(err);
    }
  }

  static async me(req, res, next) {
    try {
      // ❌ sementara kalau auth dimatiin, req.user bakal undefined
      // res.json(req.user);

      // ✅ bisa diganti hardcode user dummy biar gak error
      res.json({ message: "Auth dimatikan sementara, tidak ada user aktif" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
