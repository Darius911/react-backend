const express = require('express');
const { createAppointment, getAllAppointments, getAppointmentById, updateAppointment } = require('../controlers/appointmentControler');
const appointmentValidator  = require('../validators/appointments');
const validate = require('../validators/validate');


const router = express.Router();

router.route('/').post(validate, appointmentValidator,createAppointment).get(getAllAppointments);
router.route('/:id').get(getAppointmentById).put(updateAppointment);

module.exports = router;