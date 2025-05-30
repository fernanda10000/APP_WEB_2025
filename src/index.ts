import express from 'express';
import morgan from 'morgan';
import authRoute from './routes/auth.routes';
import connectDBMongo from './config/db';

const app = express();
const PORT = 5000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute);

connectDBMongo().then(() => {
 app.listen(PORT,()=>{
console.log('El servidor funciona en el puerto: ${PORT}');
console.log("El servidor esta funcionando en:", PORT )
})

});

