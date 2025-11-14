const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/auth');
const { Op } = require('sequelize');

// Crear tarea
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) return res.status(400).json({ message: 'Falta el título' });

    const todo = await Todo.create({ title, description, userId });
    res.status(201).json({ message: 'Tarea creada', data: todo });
  } catch (err) {
    console.error('Error al crear tarea:', err);
    res.status(500).json({ message: 'Error interno al crear tarea' });
  }
});

// Listar tareas
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const filter = req.query.filter || '';

    const { count, rows } = await Todo.findAndCountAll({
      where: {
        userId,
        title: { [Op.like]: `%${filter}%` },
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({ data: rows, total: count, page, limit, filter });
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    res.status(500).json({ message: 'Error interno al obtener tareas' });
  }
});

module.exports = router;
