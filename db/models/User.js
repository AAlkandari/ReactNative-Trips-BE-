const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

module.exports = model("User", UserSchema);
