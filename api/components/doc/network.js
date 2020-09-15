'use-strict'
const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require('../../swagger.json')

router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = router;