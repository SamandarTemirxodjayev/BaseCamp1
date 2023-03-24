const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});
const BaseCampUser = mongoose.model('BaseCampUsers', userSchema);

module.exports = BaseCampUser