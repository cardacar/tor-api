import express from 'express';

const app = express()

app.disable('x-powered-by')

app.set('port', process.env.PORT ?? 3000);
app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({"message": "Hola Mundo"})
})

export default app;