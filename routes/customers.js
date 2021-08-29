const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const express = require("express");
const { Profession } = require("../models/profession");
const { Location } = require("../models/location");
const { Job } = require("../models/job");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().select("-__v").sort("name");
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profession = await Profession.findById(req.body.professionId);
  if (!profession) return res.status(400).send("Invalid proffesion.");

  const location = await Location.findById(req.body.locationId);
  if (!location) return res.status(400).send("Invalid Location. ");

  const job = await Job.findById(req.body.jobId);
  if (!job) return res.status(400).send("Invalid Job. ");

  let customer = new Customer({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    profession: {
      _id: profession._id,
      name: profession.name,
    },
    location: {
      _id: location._id,
      name: location.name,
    },
    job: {
      _id: job._id,
      name: job.name,
    },
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profession = await Profession.findById(req.body.professionId);
  if (!profession) return res.status(400).send("Invalid proffesion.");

  const location = await Location.findById(req.body.locationId);
  if (!location) return res.status(400).send("Invalid Location. ");

  const job = await Job.findById(req.body.jobId);
  if (!job) return res.status(400).send("Invalid Job. ");

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      profession: {
        _id: profession._id,
        name: profession.name,
      },
      location: {
        _id: location._id,
        name: location.name,
      },
      job: {
        _id: job._id,
        name: job.name,
      },
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-__v");

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
