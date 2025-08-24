const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      const err = new Error("Missing/invalid token");
      err.status = 401;
      throw err;
    }

    const token = auth.split(" ")[1];
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      const err = new Error("Invalid/expired token");
      err.status = 401;
      throw err;
    }

    const user = await User.findOne({
      where: { id: payload.id, is_deleted: false },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      const err = new Error("Invalid token user");
      err.status = 401;
      throw err;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err); // lempar ke error handler
  }
}

module.exports = authenticate;
