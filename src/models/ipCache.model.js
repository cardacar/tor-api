import { Schema, model } from "mongoose";

const ipCacheSchema = new Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
    match:
      /^([0-9]{1,3}\.){3}[0-9]{1,3}$/,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default model("ipCache", ipCacheSchema);
