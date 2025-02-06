const { createAppointment, getAllAppointments, updateAppointment, getAppointmentById } = require('../models/appointmentModel');
const AppError = require('../utilities/appError');

exports.createAppointment = async (req, res, next) => {
    try {
      const newAppointment = req.body;
      const createdAppointment = await createAppointment(newAppointment);
  
      res.status(201).json({
        status: 'success',
        data: createdAppointment,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getAllAppointments = async (req, res, next) => {
    try {
      const appointments = await getAllAppointments();
      res.status(200).json({
        status: 'success',
        data: appointments,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateAppointment = async (req, res, next) => {
    try {
      // id nurodo kurį tour keičiame
      const id = req.params.id;
  
      //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
      const newAppointment = req.body;
  
      const updatedAppointment = await updateAppointment(id, newAppointment);
  
      if (!updatedAppointment) {
        throw new AppError('Invalid id, appointment not found', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedAppointment,
      });
    } catch(error) {
      next(error);
    }
  };

  exports.getAppointmentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await getAppointmentById(id);
  
      if (!appointment) {
        throw new AppError('Invalid id, appointment not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };