const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const token = await Controller.login(req.body.username, req.body.password);
        return response.success(req, res, token, 200);
    } catch (error) {
        return response.error(req, res, "Invalid data", 400);
    }

});

module.exports = router;
