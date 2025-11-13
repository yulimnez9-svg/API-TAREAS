const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/auth');

// Crear una nueva tarea
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Falta el título' });

    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

// Obtener todas las tareas (con paginación)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Todo.findAndCountAll({ limit, offset });
    res.json({
      data: rows,
      page,
      limit,
      total: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// Actualizar una tarea por id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
});

// Eliminar una tarea por id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });

    await todo.destroy();
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
});

module.exports = router;
