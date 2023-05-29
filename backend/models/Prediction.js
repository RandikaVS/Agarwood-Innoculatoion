const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema(
  {
    width: { type: "number", required: true },
    age: { type: "number", required: true },
    temperature: { type: "number", required: true },
    rainCode: { type: "number", required: true },
    soilType: { type: "number", required: true },
    whiteRootCode: { type: "number", required: true },
    pestAttacksCode: { type: "number", required: true },
    floweringSeason: { type: "number", required: true },
    result: { type: "String", default: "null" },
  },
  {
    timestapms: true,
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;