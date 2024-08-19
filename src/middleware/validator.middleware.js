import { validationResult, check } from "express-validator";

export const validateIP = [
  check("ip")
    .matches(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/)
    .withMessage("La IP no cuenta con un formato valido"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
