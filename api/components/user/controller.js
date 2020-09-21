'use strict'
const auth = require("../auth");

const TABLA = "users";

module.exports = function (injectedStore) {
  let store = injectedStore

  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = Math.floor(Math.random() * 9999);
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, user);
  };

  return {
    list: async () => store.list(TABLA),
    get: async (id) => store.get(TABLA, id),
    upsert,
  };
};
