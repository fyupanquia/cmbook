"use strict";
const auth = require("../auth");
const { nanoid } = require("nanoid");
const TABLA = "users";

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;
  if (!store) {
    store = require("../../../store/dummy");
  }
  if (!cache) {
    cache = require("../../../store/dummy");
  }

  const list = async () => {
    let users = await cache.list(TABLA);
    if (!users) {
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    }
    return users;
  };
  const get = async (id) => {
    let user = await cache.get(`${TABLA}_${id}`, id);
    if (!user) {
      user = await store.get(TABLA, id);
      cache.upsert(`${TABLA}_${id}`, user);
    }
    return user;
  };

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

  const getFollowed = async (id) => {
	const tableName = `${TABLA}_follow`
	let follows = await cache.list(`${tableName}_${id}`);
	if (!follows) {
		follows =  await store.query(tableName, { user_from: id }, [
		  { table: TABLA, type: "inner", fromField: "user_from", toField: "id" },
		]);
		cache.upsert(`${tableName}_${id}`, follows);
	}
	return follows
  }

  return {
    list,
    get,
    upsert,
    follow,
    getFollowed,
  };
};
