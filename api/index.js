'use-strict'
const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network');
const doc = require("./components/doc/network");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// ROUTER
app.use('/api/user', user);
app.use("/api/doc",doc);

app.listen(config.api.port, () => console.log(`Listening at port:${config.api.port}`) );