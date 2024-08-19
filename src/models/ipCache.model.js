import {Schema, model} from "mongoose";

const ipCacheSchema = new Schema({
    ip: {
        type: String,
        required: true,
        unique: true,
        match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    }
)

export default model("ipCache", ipCacheSchema);