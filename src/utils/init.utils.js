import userModel from '../models/user.model.js';
import logger from './logger.util.js';

const initUsers = async () => {
  try {
    const users = [
      {
        email: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD, // Asegúrate de usar contraseñas seguras
        role: 'admin'
      },
      {
        email: process.env.USER_DEFAULT,
        password: process.env.PASSWORD_DEFAULT,
        role: 'user'
      }
    ];

    for (const userData of users) {
      const userExists = await userModel.findOne({ username: userData.username });
      if (!userExists) {
        const user = new userModel(userData);
        await user.save();
        logger.info(`Usuario por defecto creado: ${user.username}`);
      } else {
        logger.info(`Usuario ya existente: ${userExists.username}`);
      }
    }
  } catch (err) {
    logger.error('Error al crear usuarios por defecto: ' + err.message);
  }
};

export default initUsers;
