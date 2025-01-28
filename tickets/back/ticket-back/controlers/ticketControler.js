const { createTicket, generateUniqueCode, getTicketById } = require('../models/ticketModel');
const AppError = require('../utilities/appError');

exports.createTicket = async (req, res, next) => {
    try {
//generate unique code
      

      const newTicket = req.body;
      const uniqueCode = generateUniqueCode();
      newTicket.unique_code = uniqueCode;
      const createdTicket = await createTicket(newTicket);
        console.log(createdTicket);
        
 
  
      res.status(201).json({
        status: 'success',
        data: createdTicket,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getTicketById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ticket = await getTicketById(id);
  
      if (!ticket) {
        throw new AppError('Invalid id, ticket not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  };