exports.checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  return next();
};
