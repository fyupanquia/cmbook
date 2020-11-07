const express = require("express");

const response = require("../network/response");
const Store = require("../store/mysql");

const router = express.Router();

router.post("/:table/query", query);
router.get("/:table/:id", get);
router.get("/:table", list);
router.post("/:table", insert);
router.put("/:table", upsert);

async function query(req, res, next) {
  const datos = await Store.query(req.params.table, req.body.query, req.body.join);
  return response.success(req, res, datos, 200);
}

async function list(req, res, next) {
  const datos = await Store.list(req.params.table);
  return response.success(req, res, datos, 200);
}

async function get(req, res, next) {
  const datos = await Store.get(req.params.table, req.params.id);
  return response.success(req, res, datos, 200);
}

async function insert(req, res, next) {
  try {
    const datos = await Store.insert(req.params.table, req.body);
    return response.success(req, res, datos, 200);  
  } catch (error) {
    return response.error(req, res, error.message, 400);  
  }
}

async function upsert(req, res, next) {
  const datos = await Store.upsert(req.params.table, req.body);
  return response.success(req, res, datos, 200);
}

module.exports = router;
