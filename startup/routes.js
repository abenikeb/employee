const express = require("express");
const professions = require("../routes/professions");
const customers = require("../routes/customers");
const locations = require("../routes/locations");
const jobs = require("../routes/jobs");
const users = require("../routes/users");
const auth = require("../routes/auth");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/professions", professions);
  app.use("/api/customers", customers);
  app.use("/api/locations", locations);
  app.use("/api/jobs", jobs);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
