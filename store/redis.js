const redis = require("redis");

const config = require("../config");

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);

      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      return resolve(res);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    client.get(`${table}_${id}`, (err, data) => {
      if (err) return reject(err);

      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      return resolve(res);
    });
  });
}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key = key + "_" + data.id;
  }
  return client.setex(key, config.redis.expire, JSON.stringify(data));
}

module.exports = {
  list,
  get,
  upsert,
};
