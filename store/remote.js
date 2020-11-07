const axios = require("axios");

function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;

  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: { "content-type": "application/json" },
  });

  const list = (table) => req("get", table);

  const get = (table, id) => req("get", `${table}/${id}`);

  const upsert = (table, data) => req("put", table, data);

  const query = (table, query, join) =>
    req("post", `${table}/query`, { query, join } );

  const insert = (table, data) => req("post", table, data);

  async function req(method, table, data) {
    const rsp = await instance[method](`/${table}`, data);
    return rsp.data ? rsp.data.body : [];
  }

  return {
    list,
    upsert,
    get,
    query,
    insert,
  };
}

module.exports = createRemoteDB;
