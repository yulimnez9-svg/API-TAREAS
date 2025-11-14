// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const User = require('./models/User');
const Todo = require('./models/Todo');

const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();

// --- Middlewares ---
app.use(cors());              // Permite peticiones desde cualquier origen
app.use(helmet());            // Seguridad HTTP headers
app.use(express.json());      // Para parsear JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// **¡Paso de depuración!** Imprime la ruta absoluta que se está usando
const publicPath = path.join(__dirname, 'public');
console.log(`Intentando servir archivos estáticos desde: ${publicPath}`); 
app.use(express.static(publicPath)); // Servir archivos estáticos

// --- Rutas ---
app.use('/auth', authRouter);
app.use('/todos', todosRouter);

// --- Función para iniciar servidor ---
async function startServer() {
  try {
    // Sincroniza DB sin borrar datos
    await sequelize.sync();

    // Usuario de prueba
    const [user] = await User.findOrCreate({
      where: { email: 'yuliana@abc.com' },
      defaults: { name: 'Yuliana', password: '123456' },
    });
    console.log(`Usuario de prueba: ${user.email}, id: ${user.id}`);

    // Levanta el servidor
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });

  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
  }
}

// Ejecuta función
startServer();

