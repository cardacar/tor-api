import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import logMiddleware from './middleware/log.middleware.js';
import errorHandler from './utils/error.util.js';
import ipRouter from './routes/ip.route.js';
import dotenv from 'dotenv'

const app = express()

app.disable('x-powered-by') //Se deshabilita el header para evitar fugas de información

app.set('port', process.env.PORT ?? 3000);
app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({"message": "Hola Mundo"})
})

export default app;