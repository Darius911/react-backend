const express = require('express');
const {createInvoice, getAllInvoices, updateInvoice, deleteInvoice, getFilteredInvoices} = require('../controlers/invoiceControler');
const validate = require('../validators/validate');
const invoiceValidator = require('../validators/invoices');







// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/').post(invoiceValidator, validate, createInvoice).get(getAllInvoices);
router.route('/:invoice_code')
.put(invoiceValidator, validate, updateInvoice)
.delete(deleteInvoice);
router.route('/filter').get(getFilteredInvoices);




module.exports = router;
