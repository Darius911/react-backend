import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import CreateAppointment from "./CreateAppointment";

const API_URL = import.meta.env.VITE_API_URL

export default function AppointmentsAll() {
  const [appointments, setAppointments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/appointments`, {
          withCredentials: true,
        });
        setAppointments(response.data.data);
        console.log(response);
        
        
      } catch (error) {
        console.log(error);
        
        if (axios.isAxiosError(error)) {
          // Check if response exists it means the request was successful and server responded with error
          if (error.response) {
            setError(
              error.response.data.message ||
                "An error occurred. Please try again."
            );
            //check if request exists and no response it means the request was not successful
          } else if (error.request) {
            setError(
              "No response from server. Check your internet connection."
            );
          } else {
            // Something happened in setting up the request, some other axios error eg. JavaScript runtime error, an issue with another part of your code
            setError("Something went wrong. Please try again.");
          }
        } else {
          //some other not axios error
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

 
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true, // 💡 Prideda vartotojo sesiją prie užklausos
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.error("Klaida trinant įrašą:", error.message);
    }
  };

  return (
   
    <section className="">
     <CreateAppointment />
      
      

      
      <div>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} deleteAppointment={deleteAppointment} />
        ))}
      </div>
    </section>
    
  );
}
