require("dotenv").config();

module.exports = {
  remoteDB: true,
  api: {
    port: process.env.API_PORT || 3000,
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
  postService: {
    host: process.env.POST_SERVICE_HOST || "localhost",
    port: process.env.POST_SERVICE_PORT || 3002,
  },
  cacheService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3003,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    expire: process.env.REDIS_EXPIRE || 10,
  },
};
