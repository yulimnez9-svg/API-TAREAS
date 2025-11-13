const sequelize = require('./config/database');
const User = require('./models/User');
const Todo = require('./models/Todo');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Crea las tablas, elimina datos viejos
    console.log('Tablas creadas correctamente en SQLite');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  } finally {
    await sequelize.close();
  }
})();
