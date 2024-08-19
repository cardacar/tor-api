import axios from "axios";
import logger from "../utils/logger.util.js";
import ipCacheModel from "../models/ipCache.model.js";

// Tiempo límite para considerar los datos de la BD desactualizados (en milisegundos)
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000;

export const getAllNodes = async () => {
  try {
    const currentTime = Date.now();
    const cachedIps = await ipCacheModel.find();

    if (
      cachedIps.length > 0 &&
      currentTime - cachedIps[0].lastUpdated.getTime() < CACHE_EXPIRATION_TIME
    ) {
      logger.info("Recuperando IPs desde la base de datos");
      return cachedIps.map((ip) => ip.ip);
    }

    const response = await axios.get("https://www.dan.me.uk/torlist/?exit");
    const ipList = response.data.trim().split("\n");

    // Actualizar la base de datos con las nuevas IPs
    await IpCache.deleteMany(); // Limpiar las IPs antiguas
    const ipCacheData = ipList.map((ip) => ({ ip, lastUpdated: currentTime }));
    await IpCache.insertMany(ipCacheData);
    logger.info("IPs recuperadas y almacenadas desde la API externa");
    return ipList;
  } catch (error) {
    logger.error("Error al obtener IPs de la API externa: " + error.message);

    // Si la API no está disponible, recuperar los datos de la BD
    const fallbackIps = await IpCache.find();
    if (fallbackIps.length > 0) {
      logger.info("Usando datos en caché desde la base de datos");
      return fallbackIps.map((ip) => ip.ip);
    } else {
      throw new Error(
        "No se pudo obtener IPs desde la API ni existen datos en caché"
      );
    }
  }
};
