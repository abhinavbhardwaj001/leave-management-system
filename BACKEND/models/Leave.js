import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  leaveType: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;