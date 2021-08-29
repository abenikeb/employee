const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Location, validate } = require("../models/location");
const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find().select("-__v").sort("name");
  res.send(locations);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = new Location({ name: req.body.name });
  location = await location.save();

  res.send(location);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!location)
    return res
      .status(404)
      .send("The location with the given ID was not found.");

  res.send(location);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const location = await Location.findByIdAndRemove(req.params.id);

  if (!location)
    return res
      .status(404)
      .send("The location with the given ID was not found.");

  res.send(location);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const location = await Location.findById(req.params.id).select("-__v");

  if (!location)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(location);
});

module.exports = router;
