const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

// Relaciones
Todo.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Todo, { foreignKey: 'userId' });

module.exports = Todo;

