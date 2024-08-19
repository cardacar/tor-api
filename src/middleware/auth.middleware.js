import jwt from "jsonwebtoken";
import logger from "../utils/logger.util.js";

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.error("Acceso denegado. No se proporcionó token.");
      return res.status(403).json({ message: "Acceso denegado" });
    }

    // Extraer el token removiendo "Bearer "
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.error("Error de autenticación: " + err.message);
        return res.status(401).json({ message: "Token inválido o expirado" });
      }

      // Verificación de roles
      if (roles.length && !roles.includes(decoded.role)) {
        logger.error("Acceso denegado. Rol no autorizado.");
        return res.status(403).json({ message: "Rol no autorizado" });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };
};
