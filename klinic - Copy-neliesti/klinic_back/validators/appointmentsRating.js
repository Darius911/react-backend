const {body} = require('express-validator');

const appointmentRatingValidator = [
  body('rating')
  .optional()
  .isNumeric()
  .withMessage('Rating must be a number')
  .isInt({min: 1, max: 5})
  .withMessage('Rating must be between 1 and 5')
];

module.exports = appointmentRatingValidator;            