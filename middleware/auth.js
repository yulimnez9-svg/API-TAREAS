const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_clave_secreta'; // en producción usa .env

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // guardamos datos del usuario en req.user
    next(); // pasa al siguiente middleware o ruta
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
