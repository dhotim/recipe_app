const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const { defaultRecipes } = require("./recipes");

const db = new JsonDB(new Config("recipe-db.json", true, true, "/"));

try {
  db.getData("/recipes");
  console.log("Database initialized from local json file...");
} catch (err) {
  console.log("Database empty, rebuilding from default data...");
  reset();
}

function reset() {
  db.push("/recipes", defaultRecipes, true);
}

module.exports = {
  db: db,
  reset,
};
