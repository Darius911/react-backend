const {body} = require('express-validator');

const appointmentEditValidator = [
  body('pets_name')
  .optional()
  .isLength({ min: 2 })
  .withMessage('Pets name must be at least 2 characters long')
  .isString()
  .withMessage('Pets name must be a string'),

  body('owner_name')
  .optional()
  .isLength({ min: 2 })
  .withMessage('Owner name must be at least 2 characters long')
  .isString()
  .withMessage('Owner name must be a string'),


  body('date')
  .optional()
  .isDate()
  .withMessage('Date must be a valid date'),

  body('time')
  .optional()
  .isTime()
  .withMessage('Time must be a valid time'),

  body('notes')
  .optional()
  .isString()
  .withMessage('Notes must be a string')
  .isLength({ max: 100 })
  .withMessage('Notes must be at most 100 characters long'),
];

module.exports = appointmentEditValidator;