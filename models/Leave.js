const mongoose = require("mongoose");
 
const leaveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });
 
module.exports = mongoose.model("Leave", leaveSchema);