require("dotenv").config();

module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  mysql: {
    host: "remotemysql.com",
    user: "2UIFO5EODl",
    password: "F4CflWlhAi",
    database: "2UIFO5EODl",
  },
};