const Mongoose = require("mongoose");

let logSchema = new Mongoose.Schema(
  {
    userId: { type: String, default: "" },
    status: { type: String, enum: ["SUCCESS", "FAILED"], default: "FAILED" },
    errMsg: { type: String, default: "" },
    request: { type: Object, default: null },
    response: { type: Object, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

logSchema.index({ userId: 1, status: 1, addedOn: 1 });

const Log = Mongoose.model("log", logSchema);

module.exports = Log;
