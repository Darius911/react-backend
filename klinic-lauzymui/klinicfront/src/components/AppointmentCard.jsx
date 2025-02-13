import {Link} from "react-router";
import StarsRating from "./StarsRating";

export default function AppointmentCard({ appointment, deleteAppointment }) {
 
  
  return (
   
   <div className="flex  justify-center gap-4 items-center max-w-4xl mx-auto  p-4 mb-4 rounded-lg shadow-md bg-amber-700 border-box">
    <div className="">{appointment.owner_name}</div>
    <div className="">{appointment.pets_name}</div>
    <div className="">{appointment.date.split("T")[0]}</div>
    <div className="">{appointment.time}</div>
    <div className="">{appointment.notes}</div>
    <div>Visit rating : {appointment.rating}</div>
    
    
    
    <div><Link to={`/appointments/${appointment.id}`}>Update appointment</Link></div>
    <div><Link to={`/myappointments/rating/${appointment.id}`}>Rate</Link></div>
    <div><button onClick={() => deleteAppointment(appointment.id)}>Delete</button></div>
  </div>
  
  )
}