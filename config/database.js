const { Sequelize } = require('sequelize');

// Base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // archivo SQLite
  logging: false,
});

module.exports = sequelize;
