import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import logger from "../utils/logger.util.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    await userModel.create({ email, password, role });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    logger.error("Error en el registro: " + error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ message: "Usuario y/o credenciales incorrectas" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    logger.error("Error en el inicio de sesión: " + error.message);
    next(error);
  }
};
