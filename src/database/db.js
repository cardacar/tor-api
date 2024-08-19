import mongoose from 'mongoose';
import logger from '../utils/logger.util.js';

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Conexión a la base de datos exitosa'))
  .catch(err => logger.error('Error al conectar a la base de datos: ' + err.message));

export default mongoose;