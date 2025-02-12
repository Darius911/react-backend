import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import CreateAppointment from "./CreateAppointment";
import FilterForm from "./FilterForm";

const API_URL = import.meta.env.VITE_API_URL;

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
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.error("Klaida trinant įrašą:", error.message);
    }
  };

  if (loading && appointments.length === 0) return <p>Įkeliama...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="">
      <CreateAppointment />
      <FilterForm 
        setAppointments={setAppointments} 
        setLoading={setLoading} 
        setError={setError} 
      />
      
      <div>
        {appointments.map((appointment) => (
          <AppointmentCard 
            key={appointment.id} 
            appointment={appointment} 
            deleteAppointment={deleteAppointment} 
          />
        ))}
      </div>
    </section>
  );
}
