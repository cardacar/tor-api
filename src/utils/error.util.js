import logger from './logger.util.js';

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};

export default errorHandler;