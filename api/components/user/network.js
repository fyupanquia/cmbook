const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();


const list = async (req, res) => {
  try {
    const data = await Controller.list();
    response.success(req, res, data, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
};
const getById = async (req, res) => {
  try {
    const data = await Controller.get(req.params.id);
    response.success(req, res, data, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
};
const upsert = async (req, res) => {
    try {
      const data = await Controller.upsert(req.body);

      response.success(req, res, data, 200);
    } catch (err) {
      response.error(req, res, err.message, 500);
    }
}

// Routes
router.get('/', list)
router.get("/:id", getById);
router.post("/", upsert);
router.put("/", upsert);

module.exports = router;
