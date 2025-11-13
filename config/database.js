
const { Sequelize } = require('sequelize'); // CommonJS

// Crea la instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // ruta al archivo de SQLite
});

module.exports = sequelize; // exporta la instancia
