let mongoose = require("mongoose")

let ideaSchema = new mongoose.Schema({
  idea: {
    type: String
  }
})

module.exports = mongoose.model("Ideas", ideaSchema)
