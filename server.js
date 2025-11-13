const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const User = require('./models/User');
const Todo = require('./models/Todo');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
