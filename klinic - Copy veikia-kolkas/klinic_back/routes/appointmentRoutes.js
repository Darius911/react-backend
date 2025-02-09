const express = require('express');
const { createAppointment, getAllAppointments, getAppointmentById, editMyAppointment,getMyAppointments, deleteAppointment, updateAppointment, getFilteredAppointments, createAppointmentRating } = require('../controlers/appointmentControler');
const appointmentValidator  = require('../validators/appointments');
const appointmentRatingValidator = require('../validators/appointmentsRating');
const appointmentEditValidator = require('../validators/appointmentsEdit');
const validate = require('../validators/validate');
const { protect, allowAccessTo } = require('../controlers/authControler');


const router = express.Router();

router.route('/')
.post(protect, allowAccessTo('user','admin'),appointmentValidator, validate, createAppointment)

.get(protect, allowAccessTo('admin'),getAllAppointments);

router.route('/filter')
.get(protect, allowAccessTo('admin'),getFilteredAppointments);

router.route('/:id')
.get(protect, allowAccessTo('user','admin'),getAppointmentById)
.patch(protect, allowAccessTo('user','admin'),appointmentEditValidator,validate,  editMyAppointment)
.delete(protect, allowAccessTo('admin','user'), deleteAppointment)

.put(protect, allowAccessTo('admin'),appointmentValidator,validate, updateAppointment);

router.route('/:id/myappointments')
.get(protect, allowAccessTo('user','admin'),getMyAppointments);

router.route('/:id/rating').patch(protect, allowAccessTo('user'), appointmentRatingValidator,validate, createAppointmentRating);




module.exports = router;