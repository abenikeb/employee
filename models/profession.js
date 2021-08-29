const Joi = require("joi");
const mongoose = require("mongoose");

const professionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Profession = mongoose.model("Profession", professionSchema);

function validateProfession(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(genre, schema);
}

exports.professionSchema = professionSchema;
exports.Profession = Profession;
exports.validate = validateProfession;
