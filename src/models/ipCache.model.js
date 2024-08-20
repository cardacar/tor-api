import { Schema, model } from "mongoose";

const ipCacheSchema = new Schema({
  ip: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default model("ipCache", ipCacheSchema);
