import { check, validationResult } from 'express-validator';

const createuserValidation = [
  check('USERNAME')
    .notEmpty().withMessage('Username is required'),
  check('u_email')
    .isEmail().withMessage('Invalid email address'),
  check('PASSWORD')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one digit')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
    check('level')
    .isLength({ min: 0, max: 8 }).withMessage('level must be between 0 and 8 characters long'),
  check('secondlevel')
    .isLength({ min: 0, max: 12 }).withMessage('secondlevel must be between 0 and 12 characters long')
];

 const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export {createuserValidation, validate}