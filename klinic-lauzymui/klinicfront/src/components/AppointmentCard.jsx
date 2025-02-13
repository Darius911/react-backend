import { Link } from "react-router";
import { FaRegWindowClose } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
export default function AppointmentCard({ appointment, deleteAppointment }) {
  return (
    <div className="flex  md:flex-row sm:flex-row justify-between gap-4 items-center  max-w-3xl mx-auto  xs:px-4 py-2 mb-4 rounded-lg shadow-md  border-box ">
      <div className="flex self-start">
        <button onClick={() => deleteAppointment(appointment.id)}>
          <FaRegWindowClose className="w-8 h-8 p-1 hover:text-white hover:bg-gray-600" />
        </button>
      </div>
      <div className="flex xs:flex-col  ">
        <div className="text-3xl font-bolder text-blue-800 self-start">
          {appointment.pets_name}
        </div>
        <div className="text-xl text-cyan-900 self-start">
          Owner:{appointment.owner_name}
        </div>
        <div className="">{appointment.notes}</div>
        <div className="flex  md:flex-row sm:flex-row  xs:gap-4">
          <div className="flex items-center flex-row">
            rate : {appointment.rating}
            <CiStar className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="bg-blue-950 hover:bg-blue-700 font-medium  px-2 rounded text-white">
            <Link to={`/myappointments/rating/${appointment.id}`}>Rate</Link>
          </div>
          <div className="bg-blue-950 hover:bg-blue-700 font-medium  px-2 rounded text-white">
            <Link to={`/appointments/${appointment.id}`}>Update</Link>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row self-start gap-2">
        <div className="">{appointment.date.split("T")[0]}</div>
        <div className="">{appointment.time}</div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col md:flex-row justify-center gap-4 items-center max-w-3xl mx-auto py-2 mb-4 rounded-lg shadow-md bg-amber-700 border-box">
    <div className="">{appointment.owner_name}</div>
    <div className="">{appointment.pets_name}</div>
    <div className="">{appointment.date.split("T")[0]}</div>
    <div className="">{appointment.time}</div>
    <div className="">{appointment.notes}</div>
    <div>Visit rating : {appointment.rating}</div>
    
    
    
    <div><Link to={`/appointments/${appointment.id}`}>Update appointment</Link></div>
    <div><Link to={`/myappointments/rating/${appointment.id}`}>Rate</Link></div>
    <div><button onClick={() => deleteAppointment(appointment.id)}>Delete</button></div>
  </div> */
}
