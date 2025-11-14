const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'mi_clave_secreta';

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Faltan datos' });

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password },
    });

    if (!created) return res.status(409).json({ message: 'Usuario ya existe' });

    res.status(201).json({ message: 'Usuario creado', data: user });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ message: 'Error interno en registro' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' });

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error interno en login' });
  }
});

module.exports = router;
