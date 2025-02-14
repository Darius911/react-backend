const { createAppointment, getAllAppointments, editAppointment, getAppointmentById, getUserAppointments, deleteAppointment, updateAppointment,  filterAppointments, createAppointmentRating, deleteMyAppointment } = require('../models/appointmentModel');
const AppError = require('../utilities/appError');

exports.createAppointment = async (req, res, next) => {
    try {
      const newAppointment = { ...req.body, user_id: req.user.id };
      
      
      newAppointment.date = new Date(newAppointment.date);
      console.log(newAppointment);

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
        newAppointmentData.date = new Date(newAppointmentData.date);
        console.log(newAppointmentData);
        // Tikriname, ar vartotojas yra adminas
        const isAdmin = req.user.role === "admin";

        // Kviečiame modelį su papildoma userId sąlyga (jei vartotojas nėra admin)
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
      const isAdmin = req.user.role === "admin";

      // Gauname įrašą pagal ID (jei adminas – mato viską, jei ne – tik savo)
      const appointment = await getAppointmentById(id, req.user.id, isAdmin);

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
    updatedVisit.date = new Date(updatedVisit.date);
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



exports.deleteMyAppointment = async (req, res, next) => {
  try {
    const { id } = req.params; // Paimame `id` iš užklausos parametrų
    const userId = req.user.id; // Paimame vartotojo `id` iš `req.user` objekto, kurį užpildo autentifikacija

    // Patikriname, ar šis paskyras priklauso šiam vartotojui
    const isAdmin = req.user.role === 'admin';  // Jei vartotojas yra admin, jis gali ištrinti bet kurį įrašą

    const appointment = await deleteMyAppointment.findOne({
      where: {
        id,
        // Jei vartotojas nėra admin, patikriname, ar paskyra priklauso jam
        userId: isAdmin ? undefined : userId,  // Jei admin, nereikia patikrinti userId
      },
    });

    // Jei įrašas neegzistuoja arba nepriklauso šiam vartotojui
    if (!appointment) {
      return next(new AppError('Appointment not found or not yours', 403));
    }

    // Jei įrašas priklauso vartotojui arba administratorius, ištriname
    await appointment.destroy();  // Ištriname paskyrą iš duomenų bazės

    res.status(200).json({
      status: 'success',
      message: 'Your appointment was deleted successfully',  // Grąžiname sėkmės žinutę
    });
  } catch (error) {
    next(error);  // Pereina prie klaidų tvarkymo middleware
  }
};





//filter ASC/DESC

exports.getFilteredAppointments = async (req, res, next) => {
  try { 
    const filter = req.query;
    console.log("Received filters:", filter);  // 🛠 Patikrink, ką backend gauna

    // Jei filtrai tušti, gražina visus įrašus
    if (Object.keys(filter).length === 0) {
      const appointments = await getAllAppointments();
      res.status(200).json({ status: 'success', data: appointments });
      return;
    }

    // Tikrina ar filtrai leidžiami
    const allowedFields = ['date', 'owner_name', 'pets_name', 'sort'];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({ 
          status: 'fail', 
          message: `Invalid filter field: '${key}'` 
        });
      }
    }

    // Filtruojami įrašai
    const filteredAppointments = await filterAppointments(filter);
    console.log("Filtered appointments:", filteredAppointments);  // 🛠 Patikrink rezultatą

    res.status(200).json({ status: 'success', data: filteredAppointments });
  } catch (error) {
    console.error("Error in getFilteredAppointments:", error); // 🛠 Log'uok klaidą
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