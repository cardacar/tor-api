import logger from '../utils/logger.util.js';

const logMiddleware = (req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}`);
  next();
};

export default logMiddleware;