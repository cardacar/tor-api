import whiteIP from '../models/ip.model.js'
import logger from '../utils/logger.util.js'
import { getAllNodes } from '../services/tor.service.js'

export const getAllIp = async (req, res, next) => {
    try {
        const ips = await getAllNodes();
        res.status(200).json({ips})
    } catch (error) {
        logger.error('Error al obtener las IPs de TOR: ' + error.message);
        next(error); 
    }
}

export const addWhiteIp = async (req, res, next) => {
    try {
        const {ip} = req.body
        const newIp = new whiteIP({ip})
        await newIp.save()
        res.status(201).json({ message: 'IP agregada correctamente a la lista blanca' });
    } catch (error) {
        logger.error('Error al agregar la IP: ' + error.message);
        next(error);
    }
}

export const getFilteredIp = async (req, res, next) => {
    try {
        const torIPs = await getAllNodes();
        const whiteIPFiltered = await whiteIP.find({}, 'ip');
        const whiteSet = new Set(whiteIPFiltered.map(ip => ip.ip));
        const filteredIPs = torIPs.filter(ip => !whiteSet.has(ip));
        res.status(200).json({ ips: filteredIPs });
      } catch (error) {
        logger.error('Error al obtener las IPs filtradas: ' + error.message);
        next(error);
      }
}