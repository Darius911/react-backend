const {body} = require('express-validator');


const invoiceValidator = [


body('due_date')
.isDate()
.withMessage('Invalid due_date'),
body('name')
.isString()
.withMessage('Name must be a string'),
body('money_amount')
.isFloat({ min: 0 })
.withMessage('Money amount must be a number'),
body('status')
.isString()
.withMessage('Status must be a string')
.isIn(['paid', 'pending', 'draft', ''])
.withMessage('Status must be "paid", "draft" or "pending"'),

]

module.exports = invoiceValidator;