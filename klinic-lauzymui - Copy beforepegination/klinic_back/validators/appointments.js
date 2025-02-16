const {body} = require('express-validator');

const appointmentValidator = [
    body('pets_name')
    .not()
    .isEmpty()
    .withMessage('Pets name is required')
    .isLength({ min: 2 })
    .withMessage('Pets name must be at least 2 characters long')
    .isString()
    .withMessage('Pets name must be a string'),

    body('owner_name')
    .not()
    .isEmpty()
    .withMessage('Owner name is required')
    .isLength({ min: 2 })
    .withMessage('Owner name must be at least 2 characters long')
    .isString()
    .withMessage('Owner name must be a string'),


    body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isDate()
    .withMessage('Date must be a valid date'),


    body('time')
    .not()
    .isEmpty()
    .withMessage('Time is required')
    .isTime()
    .withMessage('Time must be a valid time'),

    body('notes')
    .not()
    .isEmpty()
    .withMessage('Notes is required')
    .isString()
    .withMessage('Notes must be a string')
    .isLength({ min: 2, max: 255 })
    .withMessage('Notes must be at least 2 characters long, max 255'),

    body('rating')
    .optional()
    .isNumeric()
    .withMessage('Rating must be a number')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
    
];

module.exports = appointmentValidator;