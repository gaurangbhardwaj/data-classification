import Mongoose from "mongoose";

let logSchema = new Mongoose.Schema(
  {
    userId: { type: String, default: "" },
    status: { type: String, enum: ["SUCCESS", "FAILED"], default: "FAILED" },
    errMsg: { type: String, default: "" },
    req: { type: String, default: "" },
    res: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

logSchema.index({ userId: 1, status: 1, addedOn: 1 });

export default Mongoose.model("log", logSchema);
