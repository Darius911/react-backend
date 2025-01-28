const express = require('express');
const {createTicket, getTicketById} = require('../controlers/ticketControler');
const ticketValidator = require('../validators/ticket');
const validate = require('../validators/validate');







// sukuriame ir pervardiname Router tiesiog į router
const router = express.Router();

// deklaruojame, aprašome  routes, svarbi routs eilės tvarka
router.route('/').post( ticketValidator,validate, createTicket); 
router.route('/:id').get(getTicketById);





module.exports = router;
