const mongoose = require("mongoose")


const ProjectSchema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
});
const BaseCampProject = mongoose.model('BaseCampProject', ProjectSchema);

module.exports = BaseCampProject