const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // sin llaves

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Todo;
