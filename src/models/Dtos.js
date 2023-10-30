const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DtosSchema = new Schema({
  num1: { type: Number, default: 0 },
  num2: {
    type: String,
    required: false
  },
  num3: {
    type: String,
    required: false
  },
  R1: { type: Number, default: 0 },
  R2: { type: Number, default: 0 },
  R3: { type: Number, default: 0 },
  R4: { type: Number, default: 0 },
  R5: { type: Number, default: 0 },
  R6: { type: Number, default: 0 },
  });

module.exports = mongoose.model("Dtos", DtosSchema);
