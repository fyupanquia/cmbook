const db = {
  user: [
    { id: "1", name: "Carlos" },
    { id: "1", name: "Frank" },
  ],
};

function list(tabla) {
  return db[tabla];
}

function get(tabla, id) {
  let col = list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}

function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);

  console.log(db);
}

function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
