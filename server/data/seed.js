const db = require("../config/connection");
const Cost = require("../models/Cost");

const costData = require("./costData.json");

db.once("open", async () => {
  await Cost.deleteMany({});
  await Cost.insertMany(costData);
  console.log("Costs seeded 🌱")
  process.exit(0);
});

