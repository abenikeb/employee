const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Profession, validate } = require("../models/profession");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const professions = await Profession.find().select("-__v").sort("name");
  res.send(professions);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profession = new Profession({ name: req.body.name });
  profession = await profession.save();

  res.send(profession);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profession = await Profession.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!profession)
    return res
      .status(404)
      .send("The profession with the given ID was not found.");

  res.send(profession);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const profession = await Profession.findByIdAndRemove(req.params.id);

  if (!profession)
    return res
      .status(404)
      .send("The profession with the given ID was not found.");

  res.send(profession);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const profession = await Profession.findById(req.params.id).select("-__v");

  if (!profession)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(profession);
});

module.exports = router;
