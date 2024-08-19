import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Rutas de autenticación
router.post("/register", authMiddleware(["admin"]), registerUser); // Solo administradores pueden registrar usuarios
router.post("/login", login);

export default router;
