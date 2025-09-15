import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new mongoose.Schema(
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

const User = mongoose.model("User", UserSchema);
export default User;
