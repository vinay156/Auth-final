const Message = require("../models/message");

exports.home = (req, res) => {
  Message.find().exec((err, msgList) => {
    if (err) {
      return next(err);
    }
    res.render("index", {
      user: req.user,
      msgList: msgList,
    });
  });
};
