const { model, Schema } = require("mongoose");

const TripSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Trip", TripSchema);
