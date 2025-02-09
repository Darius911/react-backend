import {Link} from "react-router";


export default function AppointmentCard({ appointment, deleteAppointment }) {
 
  
  return (
   <div className="flex justify-center gap-4 items-center max-w-5xl mx-auto  p-4 mb-4 rounded-lg shadow-md">
    <div className="">{appointment.owner_name}</div>
    <div className="">{appointment.pets_name}</div>
    <div className="">{appointment.date}</div>
    <div className="">{appointment.time}</div>
    <div className="">{appointment.notes}</div>
    
    
    
    <div><Link to={`/appointments/${appointment.id}`}>Update appointment</Link></div>
    <div><button onClick={() => deleteAppointment(appointment.id)}>Delete</button></div>
   </div>
  )
}