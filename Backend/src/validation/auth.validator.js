const { body, oneOf } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('username', 'Username is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ];
};

const loginValidationRules = () => {
  return [
    oneOf([
        body('username').notEmpty(),
        body('email').isEmail(),
    ], { message: 'Either username or email is required' }),
    body('password', 'Password is required').notEmpty(),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};