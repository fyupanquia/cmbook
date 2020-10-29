const axios = require("axios");

function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;

  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: { "content-type": "application/json" },
  });

  function list(table) {
    return req("get", table);
  }

  // function get(table, id)
  // function upsert(table, data)
  // function query(table, query, join)

  async function req(method, table, data) {
    let url = URL + "/" + table;
    body = "";

    const rsp = await instance[method](`/${table}`)
    return rsp.data ? rsp.data.body : []
    /*
     new Promise((resolve, reject) => {
      axios(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("Error con la base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
    */
  }

  return {
    list,
  };
}

module.exports = createRemoteDB;
