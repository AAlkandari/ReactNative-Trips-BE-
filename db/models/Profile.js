const { model, Schema } = require("mongoose");

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Profile", ProfileSchema);
