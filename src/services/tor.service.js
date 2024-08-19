import axios from "axios";
import logger from "../utils/logger.util.js";

export const getAllNodes = async () => {
  try {
    const response = await axios.get("https://www.dan.me.uk/torlist/?exit");

    // Validar que la respuesta sea exitosa y contenga datos
    if (response.status !== 200 || !response.data) {
      throw new Error("Error al obtener datos de la fuente externa");
    }

    // Dividimos el texto por líneas para obtener las IPs
    const ips = response.data.split("\n").filter((ip) => ip.trim().length > 0);

    return ips;
  } catch (error) {
    logger.error("Error al obtener las ips: " + error.message);
    throw new Error("Error al obtener las IPs de la fuente externa");
  }
};
