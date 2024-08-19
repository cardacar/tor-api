
import logger from '../utils/logger.util.js';
import mongoose from 'mongoose';

//Conexion a la base de datos, es una funcion asincronica ya que toca esperar
//por la respuesta
(async ()=>{
    //URI de conexion a la base de datos
    const mongoUri = process.env.MONGODB_URI;
    //Try catch de la conexion a la base de datos, ya que puede fallar
    try {
        //me conecto a mongodb con mongoose
        await mongoose.connect(mongoUri);
        logger.info('Conexión a la base de datos exitosa')
    } catch (err) {
        logger.error('Error al conectar a la base de datos: ' + err.message)
    }
})();