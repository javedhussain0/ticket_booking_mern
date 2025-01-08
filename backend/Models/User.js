import mongoose from "mongoose";

const UserSchema = new Schema(
  {
    FullName: {
      type: "string",
      required: true,
    },

    Email: {
      type: "String",
      required: true,
      unique: true,
    },
    Password: {
      type: "string",
      required: true,
    },
    profileImage: {
      type: "String",
      required: true,
    },
    role: {
      type: "String",
      enum: ["admin", "user"],
      required: true,
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    valid_at: {
      type: Date,
    },
  },
  { Timestamp: true }
);

const Ticket = mongoose.model("User", UserSchema);
module.exports = User;
