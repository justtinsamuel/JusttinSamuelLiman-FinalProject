function authorize(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const err = new Error("Unauthenticated");
        err.status = 401;
        throw err;
      }

      if (!allowedRoles.includes(req.user.role)) {
        const err = new Error("Forbidden: insufficient role");
        err.status = 403;
        throw err;
      }

      next();
    } catch (err) {
      next(err); // lempar ke error handler
    }
  };
}

module.exports = authorize;
