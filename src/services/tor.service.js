import axios from "axios";
import logger from "../utils/logger.util.js";
import ipCacheModel from "../models/ipCache.model.js";

// Tiempo límite para considerar los datos de la BD desactualizados (en milisegundos)
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000;

export const getAllNodes = async () => {
  try {
    const currentTime = Date.now();

    // Verificar si hay IPs almacenadas en la base de datos
    const cachedIps = await ipCacheModel.find();
    
    if (cachedIps.length > 0) {
      // Si la base de datos tiene registros, verificar si están actualizados
      const lastUpdated = cachedIps[0].lastUpdated.getTime();
      if (currentTime - lastUpdated < CACHE_EXPIRATION_TIME) {
        logger.info('Recuperando IPs desde la base de datos');
        return cachedIps.map(ip => ip.ip);
      } else {
        logger.info('Datos en caché expirados, intentando actualizar desde la API externa');
      }
    } else {
      logger.info('Base de datos vacía, intentando obtener IPs desde la API externa');
    }

    const response = await axios.get('https://www.dan.me.uk/torlist/?exit');
    
    // Validar que la respuesta sea exitosa y contenga datos
    if (response.status !== 200 || !response.data) {
      throw new Error('Error al obtener datos de la fuente externa');
    }

    const ipList = response.data.split('\n').filter(ip => ip.trim().length > 0);

    // Actualizar la base de datos con las nuevas IPs
    await ipCacheModel.deleteMany(); // Limpiar las IPs antiguas si hay alguna
    const ipCacheData = ipList.map(ip => ({ ip, lastUpdated: currentTime }));
    await ipCacheModel.insertMany(ipCacheData);

    logger.info('IPs recuperadas y almacenadas desde la API externa');
    return ipList;
  } catch (error) {
    logger.error('Error al obtener IPs de la API externa: ' + error.message);

    // Si la API no está disponible y la base de datos estaba vacía, lanzar un error
    if (cachedIps.length === 0) {
      throw new Error('No se pudo obtener IPs desde la API y la base de datos está vacía');
    }

    // Si la base de datos tiene registros antiguos, usarlos como respaldo
    logger.info('Usando datos en caché desde la base de datos a pesar de que estén expirados');
    return cachedIps.map(ip => ip.ip);
  }
};
