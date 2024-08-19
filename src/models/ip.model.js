import {Schema, model} from "mongoose";


const ipSchema = new Schema({
    ip: { type: String, required: true, unique: true, match: /^([0-9]{1,3}\.){3}[0-9]{1,3}$/ },

}, {
    //timestamps en true para tener los datos de los tiempos de creación
    timestamps: true,
    versionKey: false,
  })

export default model("whiteIP", ipSchema);