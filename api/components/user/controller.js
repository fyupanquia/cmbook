"use strict";
const auth = require("../auth");
const { nanoid } = require("nanoid");
const TABLA = "users";

module.exports = function (injectedStore) {
  let store = injectedStore;

  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
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
  function follow(from, to) {
    return store.insert(TABLA + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  function getFollowed(id) {
    return store.query(TABLA + "_follow", { user_from: id }, [
      { table: TABLA, type: "inner", fromField: "user_from", toField: "id" },
    ]);
  }

  return {
    list: async () => store.list(TABLA),
    get: async (id) => store.get(TABLA, id),
    upsert,
    follow,
    getFollowed,
  };
};
