const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");
const router = express.Router();

const list = async (req, res, next) => {
  try {
    const data = await Controller.list();
    response.success(req, res, data, 200);
  } catch (err) {
    next();
  }
};
const getById = async (req, res, next) => {
  try {
    const data = await Controller.get(req.params.id);
    response.success(req, res, data, 200);
  } catch (err) {
    next();
  }
};
const upsert = async (req, res, next) => {
  try {
    const data = await Controller.upsert(req.body);

    response.success(req, res, data, 200);
  } catch (err) {
    next();
  }
};

// Routes
router.get("/", list);
router.get("/:id", getById);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
