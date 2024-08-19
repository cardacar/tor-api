import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import logMiddleware from './middleware/log.middleware.js';
import errorHandler from './utils/error.util.js';
import ipRouter from './routes/ip.route.js';
import authRouter from './routes/auth.router.js'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '', '.env')});

app.disable('x-powered-by') //Se deshabilita el header para evitar fugas de información

app.set('port', process.env.PORT ?? 3000);
app.use(express.json())
app.use(helmet());  // Protecciones básicas de seguridad HTTP
app.use(morgan('combined'));  // Logging básico de peticiones HTTP
app.use(logMiddleware);  // Logs personalizados

// Rutas de la aplicación
app.use('/api/v1/tor', ipRouter);  
app.use('/api/v1/user',authRouter)

app.use(errorHandler);  // Manejo centralizado de errores

app.get('/', (req, res)=> {
    res.status(200).json({"Message": "API-TOR"})
})

export default app;