import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee"
  },

  totalLeaveBalance: {
    type: Number,
    default: 20
  }
});

const User = mongoose.model("User", userSchema);
export default User;