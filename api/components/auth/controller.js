const TABLA = "auth";
const auth = require("../../../auth");
const bcryt = require('bcrypt')
module.exports = function (injectedStore) {
  let store = injectedStore;

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username });
    const isValid = await bcryt.compare(password,data.password)
    if (isValid) { // Generar token;
      return auth.sign(data);
    } else {
      throw new Error("User or password incorrect");
    }
  };

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcryt.hash(data.password,5);
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
