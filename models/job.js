const Joi = require("joi");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Job = mongoose.model("Job", jobSchema);

function validateJob(jobValid) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(jobValid, schema);
}

exports.jobSchema = jobSchema;
exports.Job = Job;
exports.validate = validateJob;
