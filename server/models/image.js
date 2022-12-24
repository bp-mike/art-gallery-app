const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  path: String,
  // image: {
  //   data: Buffer,
  //   contentType: String,
  // },
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model("Images", imageSchema);
