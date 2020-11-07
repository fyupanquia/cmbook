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
    next(err);
  }
};
const getById = async (req, res, next) => {
  try {
    const data = await Controller.get(req.params.id);
    response.success(req, res, data, 200);
  } catch (err) {
    next(err);
  }
};
const upsert = async (req, res, next) => {
  try {
    const data = await Controller.upsert(req.body);

    response.success(req, res, data, 200);
  } catch (err) {
    next(err);
  }
};

const follow = async (req, res, next) => {
  try {
    const data = await Controller.follow(req.user.id, req.params.id);
    response.success(req, res, data, 201);
  } catch (error) {
    return next(new Error(`It's imposible to follow this user`));
  }
};

function getFollowed(req, res, next) {
  Controller.getFollowed(req._auth.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

// Routes
router.get("/follow", secure("follow"), getFollowed);
router.get("/", list);
router.get("/:id", getById);
router.post("/follow/:id", secure("follow"), follow);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
