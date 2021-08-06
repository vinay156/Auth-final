const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Message", messageSchema);
