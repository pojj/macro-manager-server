import { check, validationResult } from "express-validator";

const validationRules = [
  check("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim()
    .escape(),
  check("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required"),
  check("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required"),
];

export default async function validateSignUp(req, res, next) {
  // Apply the validation rules
  await Promise.all(validationRules.map((validation) => validation.run(req)));

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors
        .array()
        .map((error) => error.msg)
        .join("\n"),
    });
    return;
  }

  // Sanitized user inputs are automatically saved back into the req body

  next();
}
