function authorize(...allowedRoles) {
  return (req, res, next) => {
    try {
      // 🚫 sementara matiin proses pengecekan role
      // if (!req.user) {
      //   const err = new Error("Unauthenticated");
      //   err.status = 401;
      //   throw err;
      // }

      // if (!allowedRoles.includes(req.user.role)) {
      //   const err = new Error("Forbidden: insufficient role");
      //   err.status = 403;
      //   throw err;
      // }

      next(); // 👉 skip authorize, langsung lanjut
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authorize;
