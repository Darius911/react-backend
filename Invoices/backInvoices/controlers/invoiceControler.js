const {createInvoice, getInvoiceByinvoice_code, generateUniqueCode, getAllInvoices, updateInvoice, deleteInvoice } = require('../models/invoiceModel');
const AppError = require('../utilities/appError');

exports.createInvoice = async (req, res, next) => {
    try {
        const newInvoice = req.body;
        const invoice_code = generateUniqueCode();
        newInvoice.invoice_code = invoice_code;
        newInvoice.status = 'draft';
        const createdInvoice = await createInvoice(newInvoice);

        res.status(201).json({
            status: 'success',
            data: createdInvoice
                
            });
    } catch (error) {
        next(error);
    };
};

exports.getInvoiceByinvoice_code = async (req, res, next) => {
    try {
      const { invoice_code} = req.params;
      const invoice = await getInvoiceByinvoice_code(invoice_code);
  
      if (!invoice) {
        throw new AppError('Invalid invoice_code, invoice not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getAllInvoices = async (req, res, next) => {
    try {
      const invoices = await getAllInvoices();
      res.status(200).json({
        status: 'success',
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateInvoice = async (req, res, next) => {
    try {
      // id nurodo kurį tour keičiame
      const iinvoice_code = req.params.invoice_code;
  
      //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
      const newInvoice = req.body;
  
      const updatedInvoice = await updateInvoice(iinvoice_code, newInvoice);
  
      if (!updatedInvoice) {
        throw new AppError('Invalid iinvoice_code, iinvoice not found', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedInvoice,
      });
    } catch(error) {
      next(error);
    }
  };

  exports.deleteInvoice = async (req, res, next) => {
    const { invoice_code } = req.params;
  
  
    try {
      const invoice = await deleteInvoice(invoice_code);
      
      
      if (!invoice) {
        throw new AppError('invoice not found', 404);
      }
      
      res.status(200).json({
        status: 'success',
        data: invoice,
        message: 'invoice deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };