const Joi = require("joi");
const mongoose = require("mongoose");
const { professionSchema } = require("./profession");
const { locationSchema } = require("./location");
const { jobSchema } = require("./job");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
      min: 15,
      max: 100,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    profession: {
      type: professionSchema,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    job: {
      type: jobSchema,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    age: Joi.number().min(0).required(),
    professionId: Joi.objectId().required(),
    locationId: Joi.objectId().required(),
    jobId: Joi.objectId().required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
