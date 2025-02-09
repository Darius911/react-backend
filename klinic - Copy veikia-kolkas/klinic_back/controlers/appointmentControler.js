const { createAppointment, getAllAppointments, editAppointment, getAppointmentById, getUserAppointments, deleteAppointment, updateAppointment,  filterAppointments, createAppointmentRating } = require('../models/appointmentModel');
const AppError = require('../utilities/appError');

exports.createAppointment = async (req, res, next) => {
    try {
      const newAppointment = { ...req.body, user_id: req.user.id };
      
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
      const { id } = req.params;
      const newAppointmentData = req.body;
  
      // Jei vartotojas yra admin, jis gali keisti bet kokį įrašą
      const isAdmin = req.user.role === "admin";
      const updatedAppointment = await updateAppointment(id, newAppointmentData, isAdmin ? null : req.user.id);
  
      if (!updatedAppointment) {
        return next(new AppError("Appointment not found or not yours", 403));
      }
  
      res.status(200).json({
        status: "success",
        data: updatedAppointment,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getAppointmentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Gaunam vizitą pagal ID ir vartotojo ID
      const appointment = await getAppointmentById(id, req.user.id);
  
      if (!appointment) {
        return next(new AppError("Appointment not found or not yours", 403));
      }
  
      res.status(200).json({
        status: "success",
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };
  


  exports.getMyAppointments = async (req, res, next) => {
    try {
      const appointments = await getUserAppointments(req.user.id);

      res.status(200).json({
        status: 'success',
        data: appointments,
      });
    } catch (error) {
      next(error);
    }
};

//update only yours visits
exports.editMyAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedVisit = await editAppointment(id, req.user.id, req.body);

    if (!updatedVisit) {
      return next(new AppError("Visit not found or not yours", 403));
    }

    res.status(200).json({
      status: "success",
      data: updatedVisit,
    });
  } catch (error) {
    next(error);
  }
};

//delete only yours visits
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Jei vartotojas yra admin, jis gali trinti bet kokį įrašą
    const isAdmin = req.user.role === "admin";
    const deletedVisit = await deleteAppointment(id, isAdmin ? null : req.user.id);

    

    if (!deletedVisit) {
      return next(new AppError("Visit not found or not yours", 403));
    }

    res.status(200).json({
      status: "success", 
      message: "Visit deleted successfully",   
    })
  } catch (error) {
    next(error);
  }
};

//filter ASC/DESC

exports.getFilteredAppointments = async (req, res, next) => {
  try {
    const filter = req.query;
    console.log("Received filters:", req.query);

    // If no query string, return all appointments
    if (Object.keys(filter).length === 0) {
      const appointments = await getAllAppointments();
      res.status(200).json({
        status: 'success',
        data: appointments,
      });
      return;
    }

    // Validate filter fields
    const allowedFields = ['date', 'owner_name', 'pets_name', 'sort'];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(', ')}`,
        });
      }
    }

    // If query string, return filtered appointments
    const filteredAppointments = await filterAppointments(filter);

    res.status(200).json({
      status: 'success',
      data: filteredAppointments,
    });
  } catch (error) {
    next(error);
  }
};



exports.createAppointmentRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedVisit = await createAppointmentRating(id, req.user.id, req.body);

    if (!updatedVisit) {
      return next(new AppError("Visit not found or not yours", 403));
    }

    res.status(200).json({
      status: "success",
      data: updatedVisit,
    });
  } catch (error) {
    next(error);
  }
};