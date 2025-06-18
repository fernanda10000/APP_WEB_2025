
import morgan from 'morgan';
import express from 'express';
import authRoute from './routes/auth.routes';
// import { connect } from 'http2'; // Esta línea no parece necesaria, pero no la removo ya que pediste no quitar nada
import connectDBMongo from './config/db';
import orderRoutes from './routes/order.routes'; // Importar las rutas de órdenes
import userRoutes from "./routes/user.routes";
import productRoutes from './routes/product.routes'; // Importar las rutas de productos

// Inicializar el servidor de express 
const app = express();
app.use(express.json()); // Middleware para parsear JSON
// Asignar el número de puerto
const PORT = 3000;

app.use(morgan('dev'));  // Mostrar logs de las peticiones
app.use('/api/v1/user', userRoutes); // Ruta para los usuarios
app.use('/api/v1/auth', authRoute); // ruta principal
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/product', productRoutes); // Ruta para los productos

// Ruta para las órdenes
connectDBMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`El servidor funciona con el puerto: ${PORT}`);
        console.log("El servidor está funcionando:", PORT);
    });
});

//a79b98c54feac8e0a6f86c2cfd7ad0ca17a16821
